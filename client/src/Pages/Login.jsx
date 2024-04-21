import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popUp, setPopUp] = useState("");
  const navigate = useNavigate();
  async function login() {
    try {
      setPopUp("");
      const response = await axios.post(`http://localhost:3001/api/login`, {
        email,
        password,
      });

      setPopUp("Login successful");
      localStorage.setItem("token", response.data.userId);
      localStorage.setItem("email", response.data.email);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setPopUp("An error occurred. Please try again.");
    }
  }

  async function signup() {
    try {
      setPopUp("");
      const response = await axios.post(`http://localhost:3001/api/signup`, {
        email,
        password,
      });

      setPopUp(response.data.message);
    } catch (error) {
      console.log(error);
      setPopUp("An error occurred. Please try again.");
    }
  }
  return (
    <>
      <div className="bg-white h-screen w-full flex">
        <div className="w-[50%] h-screen bg-black text-white flex flex-col justify-center items-center">
          <img src="logo.jpg" className="w-[20%] rounded-full" />
          <div className="text-[5rem] font-ubuntu ">ChurnZe</div>
          <div className="text-[1.2rem] font-ubuntu ">
            Your AI based business churn analyser
          </div>
        </div>
        <div className="w-[50%] h-screen bg-white text-black  flex justify-center items-center">
          <div className="w-[50%]">
            <div className="text-2xl font-ubuntu font-medium text-center my-5">
              Welcome to ChurnZe
            </div>
            <div>
              <div className="font-semibold m-1 text-primarytextcolor">
                Email
              </div>
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className=" h-10 w-full rounded-lg px-4 focus:outline-none border border-neutral-200"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <div className="font-semibold m-1 text-primarytextcolor">
                Password
              </div>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className=" h-10 w-full rounded-lg px-4 focus:outline-none border border-neutral-200"
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={login}
              className=" w-full bg-black text-white p-2 my-5 rounded-full text-center font-ubuntu font-medium hover:bg-neutral-800 active:bg-neutral-700"
            >
              Login
            </button>
            <button
              onClick={signup}
              className=" w-full bg-blue-600 text-white p-2  rounded-full text-center font-ubuntu font-medium hover:bg-neutral-800 active:bg-neutral-700"
            >
              Sign Up
            </button>
            <div className="text-red-500 text-sm font-ubuntu text-center">
              {popUp}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
