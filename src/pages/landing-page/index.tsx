import { useState } from "react";
import biglogo from "../../../public/logo-big.png";
import devider from "../../../public/divider.png";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

interface User {
  email: string;
  username: string;
  password: string;
}

export default function LandingPage() {
  const router = useRouter();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState<User>({
    email: "",
    username: "",
    password: "",
  });

  const backendUrl = process.env.NEXT_PUBLIC_BE_URL;
  console.log(backendUrl);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);

  const toSignUp = () => {
    openSignUpModal();
    closeLoginModal();
  };

  const handleRegister = () => {
    axios
      .post(`${backendUrl}/register`, user)
      .then((res) => {
        console.log("Registration successful:", res.data);
        setErrorMessage(""); // Clear any previous error messages
        closeSignUpModal();
      })
      .catch((err) => {
        console.error("There was an error registering!", err);
        setErrorMessage(err.response?.data?.message || "Registration failed.");
      });
  };

  // const handleLogin = () => {
  //   axios
  //     .post(`${backendUrl}/login`, user)
  //     .then((res) => {
  //       const token = res.data.token;
  //       Cookies.set("jwt", token);
  //       console.log("Login successful:", res.data);
  //       router.push("/home"); // Redirect after login
  //       setErrorMessage('');
  //     })
  //     .catch((err) => {
  //       console.error("There was an error logging in!", err);
  //       setErrorMessage(err.response?.data?.message || 'Your username or password might be wrong');
  //     });
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-200 via-gray-50 to-red-100 min-h-screen">
        <div className="flex flex-col justify-self-center pt-20 w-[50%]">
          <Image src={biglogo} alt="Big Logo" className="w-[70%] self-center" />
          <Image src={devider} alt="Divider" className="w-[43%] self-center" />
          <label className="font-afacad self-center text-center pt-6">
            Create personalized emojis with our emoji maker <br /> that truly
            reflect you.
          </label>
        </div>
        <div className="flex flex-row gap-10 w-full justify-center text-black pt-10 font-freeman">
          <button
            onClick={openLoginModal}
            className="bg-[#D4D4D4] border-white px-4 py-1 rounded-md"
          >
            Log In
          </button>
          <button
            onClick={openSignUpModal}
            className="bg-[#D4D4D4] border-white px-4 py-1 rounded-md"
          >
            Sign Up
          </button>
        </div>
      </div>

      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black float-start p-6 w-[30%] rounded-3xl">
            <div className="pb-4">
              <label className="text-white font-freeman text-3xl">
                Log in or Sign Up
              </label>
            </div>
            <div className="bg-white w-full rounded-lg px-6 pt-4 pb-20">
              <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Type your username here"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Must have at least 8 characters"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <button
                className="font-freeman bg-gradient-to-r from-blue-500 to-blue-900 text-white w-full rounded-md py-1 mt-4"
                // onClick={handleLogin}
              >
                Log In
              </button>
              {errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
              )}
              <label className="font-afacad">Don't have an account yet?</label>
              <button
                onClick={toSignUp}
                className="font-freeman text-black w-full rounded-md py-1 mt-4 border border-[#B9B9B9]"
              >
                Create an Account
              </button>
            </div>
            <button onClick={closeLoginModal} className="text-white mt-4">
              Close
            </button>
          </div>
        </div>
      )}

      {isSignUpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black float-start p-6 w-[30%] rounded-3xl">
            <div className="pb-4">
              <label className="text-white font-freeman text-3xl">
                Create an Account
              </label>
            </div>
            <div className="bg-white w-full rounded-lg px-6 pt-4 pb-20">
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Username must be unique"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Must have at least 8 characters"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <button
                onClick={handleRegister}
                className="font-freeman bg-gradient-to-r from-blue-500 to-blue-900 text-white w-full rounded-md py-1 mt-4"
              >
                Start
              </button>
              {errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
              )}
            </div>
            <button onClick={closeSignUpModal} className="text-white mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
