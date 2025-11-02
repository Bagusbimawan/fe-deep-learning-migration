import Navbar from "@/components/Navbar/Navbar";
import React, { useState } from "react";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import Swal from "sweetalert2";

const EditProfile = () => {
  useProtectedRoute();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    username: user?.Username || "",
    email: user?.Email || "",
    phone: user?.Phone || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.put(
        `http://localhost:8000/api/user/${user?.ID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser({
        ...user!,
        Username: formData.username,
        Email: formData.email,
        Phone: formData.phone,
      });

      Swal.fire({
        text: "Profile updated successfully",
        icon: "success",
      });
    } catch (error: any) {
      Swal.fire({
        text: error.response?.data?.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-gray-50 to-red-100">
      <Navbar />
      <div className="max-w-md mx-auto pt-10 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-md py-2 hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
