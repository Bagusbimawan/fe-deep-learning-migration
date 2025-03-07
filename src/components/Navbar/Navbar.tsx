"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Profilelogo from "../../../public/profile-icon.png";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const toggleProfileModal = () => setProfileModalOpen((prev) => !prev);

  const handleEditAcc = () => router.push("/edit-profile");

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      localStorage.removeItem("jwt");
      logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 shadow-md relative z-10">
      <div className="flex flex-wrap items-center justify-between p-4 max-w-screen-xl mx-auto">
        <Link href="/home">
          <p className="text-lg text-gray-600 hover:text-black cursor-pointer">
            Home
          </p>
        </Link>
        <div className="flex space-x-6">
          <a className="text-lg text-gray-600 hover:text-black cursor-pointer">
            Help
          </a>
          <a className="text-lg text-gray-600 hover:text-black cursor-pointer">
            About Us
          </a>
          <a className="cursor-pointer" onClick={toggleProfileModal}>
            <Image
              src={Profilelogo}
              className="h-10 w-10 rounded-full"
              alt="profile"
            />
          </a>
        </div>
      </div>

      {isProfileModalOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
          <div className="px-4 py-2 text-gray-800">
            <label className="block font-bold">PROFILE ACCOUNT</label>
            <label className="block truncate">{user?.Username}</label>
            <label className="block truncate">{user?.Email}</label>
            <button
              className="w-full text-left mt-2 text-blue-500 hover:underline"
              onClick={handleEditAcc}
            >
              Edit Account
            </button>
            <hr className="my-2" />
            <button
              className="w-full text-left text-red-500 hover:underline"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
