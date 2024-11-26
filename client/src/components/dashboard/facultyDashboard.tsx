"use client";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState("");

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    // Fetch the teacher's name from local storage and update the state
    const user = localStorage.getItem("token");
    if (user) {
      setTeacherName(JSON.parse(user).username);
    } else {
      throw new Error("Teacher name not found in local storage");
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800">
            {(() => {
              const currentHour = currentDate.getHours();
              if (currentHour < 12) return `Good Morning, ${teacherName}`;
              if (currentHour < 18) return `Good Afternoon, ${teacherName}`;
              return `Good Evening, ${teacherName}`;
            })()}
          </h2>
        </div>

        {/* Dashboard Title */}
        {/* <div className="bg-blue-500 text-white p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold">Faculty Dashboard</h3>
        </div> */}

        {/* Date and Time */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600">{formattedDate}</div>
          <div className="text-gray-600">{formattedTime}</div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "My courses", path: "/faculty/attendance" },
            { title: "Mentees", path: "/faculty/mentors" },
            { title: "Exam Details", path: "/faculty/exam-details" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-6 text-center transition-colors"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
