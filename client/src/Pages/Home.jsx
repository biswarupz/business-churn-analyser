import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log("Selected file:", e.target.files[0]); // Add this line
  };

  const handleSendCSV = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("csv", file);

    try {
      const response = await fetch(
        `http://localhost:3001/api/csv?token=${token}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error sending CSV: ${response.statusText}`);
      }

      console.log("CSV data sent successfully!");
      setFile("");
      window.location.reload();
    } catch (error) {
      console.error("Error sending CSV:", error);
    }
  };
  async function getImage() {
    const response = await axios.post(
      `http://localhost:3001/api/image?token=${token}`
    );
    setImage(response.data.image);
  }
  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className=" h-screen bg-black flex flex-col justify-evenly items-center">
      <div className="w-[80%] h-[8vh] rounded-full bg-white  border border-neutral-200 flex justify-between px-5 items-center">
        <div className="text-4xl font-ubuntu">ChurnZe </div>
        <div className="flex items-center gap-4">
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="py-1 px-4 rounded-full border border-neutral-200 text-lg font-mono"
            >
              Logout
            </button>
          </div>
          <div className="text-sm font-ubuntu text-blue-600">Hi, {email}</div>
        </div>
      </div>
      <div class="w-[80%] bg-white border border-neutral-300 h-[80vh]">
        <div className="flex  bg-neutral-100 shadow-md justify-center items-center gap-4 p-2">
          <form onSubmit={(e) => e.preventDefault()}>
            <label
              for="csvFileInput"
              class="flex items-center cursor-pointer rounded-lg border border-neutral-300 py-2 px-4 bg-gray-100 hover:bg-gray-200"
            >
              <span class="text-sm font-medium font-ubuntu text-blue-600">
                Choose CSV File
              </span>
            </label>
            <input
              type="file"
              id="csvFileInput"
              accept=".csv"
              onChange={handleFileChange}
              hidden
            />
          </form>

          <button
            type="button"
            onClick={handleSendCSV}
            className=" px-4 py-2  h-10 rounded-full bg-blue-600 text-sm font-ubuntu  hover:bg-blue-700 text-white font-medium"
          >
            SUBMIT
          </button>
          {file && (
            <p className="text-sm font-ubuntu font-semibold text-blue-600">
              {" "}
              {file.name}
            </p>
          )}
          {/* <button
            onClick={getImage}
            className=" px-4 py-2  h-10 rounded-full bg-blue-600 text-sm font-ubuntu  hover:bg-blue-700 text-white font-medium"
          >
            Get Result
          </button> */}
        </div>
        <div className="flex w-full justify-center items-center">
          {image ? (
            <img src={image} className=" h-[70vh] my-5" />
          ) : (
            <div className="text-xl my-10 font-ubuntu">No Result found</div>
          )}
        </div>
      </div>
    </div>
  );
};
