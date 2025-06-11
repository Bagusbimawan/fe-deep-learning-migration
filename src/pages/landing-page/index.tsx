import { useState } from "react";
import biglogo from "../../../public/logo-big.png";
import devider from "../../../public/divider.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/useAuthStore";
interface Register {
  username: string;
  email: string;
  password: string;
  phone: string;
}

interface User {
  username: string;
  password: string;
}

export default function LandingPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

  const [login, setlogin] = useState<User>({
    username: "",
    password: "",
  });

  const [register, setregister] = useState<Register>({
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const backendUrl = process.env.NEXT_PUBLIC_BE_URL;
  
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);

  const toSignUp = () => {
    openSignUpModal();
    closeLoginModal();
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${backendUrl}/register`, register);
      Swal.fire({
        text: "Register Success",
        icon: "success",
      });
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        Username: login.username,
        Password: login.password,
      });
      

      const { Username, Email, ID, Phone } = response.data.data;
      
      const userData = { Username, Email,  ID, Phone };
      // Store in Zustand
      setUser(userData);
      // Store complete user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      

      Swal.fire({
        text: "success login",
        icon: "success",
      });
      router.push("/home");
    } catch (error: any) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
      console.log(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setlogin((prev) => ({
      ...prev,
      [name]: value,
    }));
    setregister((prev) => ({
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
          <div className="bg-black p-6 w-full max-w-md mx-4 rounded-3xl">
            <div className="pb-4">
              <label className="text-white font-freeman text-3xl">
                Log in or Sign Up
              </label>
            </div>
            <div className="bg-white w-full rounded-lg px-6 pt-4 pb-8">
              <div className="flex flex-col mb-4">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Type your username here"
                  name="username"
                  value={login.username}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Must have at least 8 characters"
                  name="password"
                  value={login.password}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <button
                className="font-freeman bg-gradient-to-r from-blue-500 to-blue-900 text-white w-full rounded-md py-2 mt-4"
                onClick={handleLogin}
              >
                Log In
              </button>

              <label className="font-afacad mt-4 block text-center">
                Don't have an account yet?
              </label>
              <button
                onClick={toSignUp}
                className="font-freeman text-black w-full rounded-md py-2 mt-2 border border-[#B9B9B9]"
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
          <div className="bg-black p-6 w-full max-w-md mx-4 rounded-3xl">
            <div className="pb-4">
              <label className="text-white font-freeman text-3xl">
                Create an Account
              </label>
            </div>
            <div className="bg-white w-full rounded-lg px-6 pt-4 pb-8">
              <div className="flex flex-col mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={register.email}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="Username must be unique"
                  name="username"
                  value={register.username}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Must have at least 8 characters"
                  name="password"
                  value={register.password}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label>Number phone</label>
                <input
                  type="text"
                  placeholder="Number phone"
                  name="phone"
                  value={register.phone}
                  onChange={handleInputChange}
                  className="border border-[#A4A4A4] rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <button
                onClick={handleRegister}
                className="font-freeman bg-gradient-to-r from-blue-500 to-blue-900 text-white w-full rounded-md py-2 mt-4"
              >
                Start
              </button>
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
