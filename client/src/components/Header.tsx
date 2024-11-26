import React, { useEffect, useState } from "react";
import Image from "next/image";
import drait from "@/assets/full_logo-wide.png";
import usericon from "@/assets/user-icon.jpg";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [teacherName, setTeacherName] = useState(""); // Default name
  const router = useRouter();

  useEffect(() => {
    // Fetch the teacher's name from local storage and update the state
    const storedName = localStorage.getItem("teacherName");
    if (storedName) {
      setTeacherName(storedName);
    } else {
      throw new Error("Teacher name not found in local storage");
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-white from-25% via-blue-500 to-purple-600 flex flex-col gap-y-2 sm:flex-row items-center justify-between px-4 py-2 ">
      <div className="flex-start">
        <Image src={drait} width={400} height={500} alt="drait logo wide"/>
      </div>
      <div className="relative flex items-center space-x-2 group">
        <div className="h-8 w-8 rounded-full bg-purple-700 flex items-center justify-center cursor-pointer">
          <Image
            src={usericon}
            width={300}
            height={300}
            alt="user-icon"
            className="rounded-3xl"
          />
          <User className="h-5 w-5 text-white" />
        </div>
        <span>{teacherName}</span>{" "}
        
        {/* Dynamically display the teacher's name */}
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ul className="py-1">
            <li
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push("faculty/profile")}
            >
              Go to Profile
            </li>
            <li
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push("/")}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;