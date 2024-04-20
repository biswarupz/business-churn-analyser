export const Login = () => {
  return (
    <div className="bg-white h-screen w-full flex">
      <div className="w-[50%] h-screen bg-black text-white flex flex-col justify-center items-center">
        <img src="logo.jpg" className="w-[20%] rounded-full" />
        <div className="text-[5rem] font-ubuntu ">ChrunZe</div>
        <div className="text-[1.2rem] font-ubuntu ">
          Your AI based business chrun analyser
        </div>
      </div>
      <div className="w-[50%] h-screen bg-white text-black  flex justify-center items-center">
        <div className="w-[50%]">
          <div className="text-2xl font-ubuntu font-medium text-center my-5">
            Welcome to ChrunZe
          </div>
          <div>
            <div className="font-semibold m-1 text-primarytextcolor">Email</div>
            <input
              type="email"
              className=" h-10 w-full rounded-lg px-4 focus:outline-none border border-neutral-200"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <div className="font-semibold m-1 text-primarytextcolor">
              Password
            </div>
            <input
              className=" h-10 w-full rounded-lg px-4 focus:outline-none border border-neutral-200"
              placeholder="Enter password"
            />
          </div>
          <div className=" w-full bg-black text-white p-2 my-5 rounded-full text-center font-ubuntu font-medium hover:bg-neutral-800 active:bg-neutral-700">
            <button>Login/Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};
