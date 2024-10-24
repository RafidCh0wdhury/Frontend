// pages/home.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const options = [
  { value: "CIT 160", label: "CIT 160" },
  { value: "IS 441", label: "IS 441" },
];

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [classFile, setClassFile] = useState({});

  useEffect(() => {
    const details = localStorage.getItem("userDetails");

    if (!details) {
      router.push("/auth/login");
    } else {
      const userDetails = JSON.parse(details);
      setUser(userDetails);
    }
  }, [router]);

  const handleChange = (selectedOption) => {
    setClassFile(selectedOption);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  console.log(classFile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !fileName) {
      toast("Please provide all information.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user?.id);
    formData.append("resourceName", fileName);
    formData.append("resourceClass", classFile.value || "CIT 160");
    formData.append("pdf", file);

    try {
      const response = await fetch("http://localhost:3002/resource", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      toast("File uploaded successfully!");

      setFileName("");
      setFile(null);
      e.target.reset();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="">
      <h1 className="font-bold text-xl text-center mb-10">
        Welcome {user?.name}!
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-4 border border-gray-200 rounded-md"
        >
          <h2 className="text-center text-xl font-semibold mb-5">
            Upload your notes!
          </h2>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              File Name
            </label>
            <input
              type="text"
              id="fileName"
              onChange={(e) => setFileName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="filename"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Class
            </label>
            <Select
              className="mb-5"
              value={classFile}
              onChange={handleChange}
              options={options}
            />
          </div>
          <div className="flex flex-col space-y-5">
            <input type="file" onChange={handleFileChange} />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
