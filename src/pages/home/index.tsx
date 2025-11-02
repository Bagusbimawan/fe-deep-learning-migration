import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sideimage from "../../../public/sideImage.svg";
import Logo from "../../../public/logo.svg"
import WebcamCapture from "@/components/webcapture/Webcapture";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import useProtectedRoute from "../../hooks/useProtectedRoute";

export default function Home() {
  const [inputMethod, setInputMethod] = useState("file");
  const [image, setImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // protecte page route
  useProtectedRoute()
  // Handle file input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle webcam capture
  const handleWebcamCapture = (imageSrc: string) => {
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "webcam-image.jpg", { type: "image/jpeg" });
        setSelectedFile(file);
        setImage(imageSrc);
      })
      .catch((error) => console.error("Error capturing webcam image:", error));
  };

  // Handle upload to backend
  const handleclickupload = async () => {
    if (!selectedFile) {
      Swal.fire({
        text: "No image selected!",
        icon: "warning",
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("jwt");
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        text: "Success upload",
        icon: "success",
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        text: "Failed upload",
        icon: "error",
      });
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#DCE8FF] min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 pt-4 flex flex-col items-center">
        <Image src={Logo} alt="logo" className="w-3/4 md:w-2/3" />
        <Image src={Sideimage} alt="sideImage" className="max-h-screen pt-2" />
      </div>
      <div className="bg-white mt-8 md:mt-0 rounded-tl-3xl px-6 pt-4 w-full md:w-2/3 min-h-screen">
        <Navbar />
        <div className="relative bg-black mt-8 mx-auto max-w-lg px-10 pt-16 pb-8 rounded-xl">
          <h1 className="text-white text-center">Please input your image first</h1>
          <div className="flex flex-col bg-white rounded-lg p-4 mt-4">
            <select
              value={inputMethod}
              onChange={(e) => setInputMethod(e.target.value)}
              className="rounded-lg mb-4"
            >
              <option value="file">Choose from file</option>
              <option value="webcam">Take a picture</option>
            </select>

            {inputMethod === "file" && (
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="rounded-lg mb-4"
              />
            )}

            {inputMethod === "webcam" && <WebcamCapture onCapture={handleWebcamCapture} />}
          </div>
          <button
            onClick={handleclickupload}
            className="bg-blue-700 text-white rounded-lg px-3 py-1 mt-4 mx-auto block"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Generate"}
          </button>

          {image && (
            <div className="mt-4">
              <h2 className="text-white text-center">Preview:</h2>
              <img src={image} alt="Preview" className="rounded-lg mt-2 mx-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
