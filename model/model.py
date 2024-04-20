import pandas as pd
from matplotlib import pyplot as plt
import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sn

df = pd.read_csv("./model/data.csv")
df.drop('customerID', axis='columns', inplace=True)

df.replace('No internet service', 'No', inplace=True)
df.replace('No phone service', 'No', inplace=True)
df['TotalCharges'] = df['TotalCharges'].replace(' ', 0).astype(float)

yes_no_columns = ['Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'OnlineSecurity', 'OnlineBackup',
                  'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 'PaperlessBilling', 'Churn']
for col in yes_no_columns:
    df[col].replace({'Yes': 1, 'No': 0}, inplace=True)

df['gender'].replace({'Female': 1, 'Male': 0}, inplace=True)

df = pd.get_dummies(data=df, columns=['InternetService', 'Contract', 'PaymentMethod'])

cols_to_scale = ['tenure', 'MonthlyCharges', 'TotalCharges']
scaler = MinMaxScaler()
df[cols_to_scale] = scaler.fit_transform(df[cols_to_scale])

X = df.drop('Churn', axis='columns')
y = df['Churn']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=5)

model = keras.Sequential([
    keras.layers.Dense(26, input_shape=(26,), activation='relu'),
    keras.layers.Dense(15, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=100)

model.evaluate(X_test, y_test)

yp = model.predict(X_test)
y_pred = [1 if element > 0.5 else 0 for element in yp]

print(classification_report(y_test, y_pred))

cm = tf.math.confusion_matrix(labels=y_test, predictions=y_pred)
plt.figure(figsize=(10, 7))
sn.heatmap(cm, annot=True, fmt='d')
plt.xlabel('Predicted')
plt.ylabel('Truth')
plt.savefig('./uploads/prediction.png')
plt.show()

accuracy = round((sum(y_pred == y_test) / len(y_test)), 2)
print(f"Accuracy: {accuracy}")

precision_0 = round(sum((y_pred == 0) & (y_test == 0)) / sum(y_pred == 0), 2)
print(f"Precision for 0 class (non-churn): {precision_0}")

precision_1 = round(sum((y_pred == 1) & (y_test == 1)) / sum(y_pred == 1), 2)
print(f"Precision for 1 class (churn): {precision_1}")

recall_0 = round(sum((y_pred == 0) & (y_test == 0)) / sum(y_test == 0), 2)
print(f"Recall for 0 class (non-churn): {recall_0}")

recall_1 = round(sum((y_pred == 1) & (y_test == 1)) / sum(y_test == 1), 2)
print(f"Recall for 1 class (churn): {recall_1}")