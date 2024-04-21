const express = require("express");
const cors = require("cors");
const app = express();
const { Company } = require("./db/db");
const port = 3001;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Server is live" });
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Company.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await Company.create({ email, password });
    return res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Company.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Failed to log in" });
  }
});

////////////////////////////////////////////////////////

const multer = require("multer");
const { emit } = require("nodemon");
const upload = multer({ dest: "uploads/" });

app.post("/api/csv", upload.single("csv"), async (req, res) => {
  const token = req.query.token;

  if (!req.file) {
    return res.status(400).send("No CSV file uploaded");
  }

  const csvFile = req.file;
  console.log(token);
  try {
    console.log(`CSV file uploaded successfully: ${csvFile.originalname}`);
    const getUser = await Company.findById(token);
    const update = await Company.updateOne({
      email: getUser.email,
      testfile: csvFile.filename,
    });
    console.log(update);
    res.status(200).send("CSV file uploaded successfully!");
  } catch (error) {
    console.error("Error uploading CSV:", error);
    res.status(500).send("Failed to upload CSV");
  }
});

app.post("/api/image-update", async (req, res) => {
  const token = req.query.token;
  const result = req.body;
  const find = await Company.findById(token);
  const updateresult = await Company.update({
    emit: find.email,
    result: result,
  });
  return res.json({ status: 200 });
});

app.post("/api/image", async (req, res) => {
  const token = req.query.token;
  console.log(token);
  const data = await Company.findById(token);
  console.log(data.result);
  return res.json({ status: 200, image: data.result });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
