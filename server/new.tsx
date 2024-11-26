This is the hod/principal dashboard
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DynamicDashboard = () => {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState("");
  const [facultyDetails, setFacultyDetails] = useState(null);
  const [hodDetails, setHodDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facultyId, setFacultyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
      setFacultyId(JSON.parse(user).facultyId);
      setTeacherName(JSON.parse(user).username);
    }  else {
      throw new Error("Teacher name not found in local storage");
    }
  }, []);

  // useEffect(() => {
  //   const fetchHODDetails = async () => {
  //     const user = localStorage.getItem("token");
  //     if (user) {
  //       const facultyid = JSON.parse(user).facultyId;
  //       console.log(facultyid);
  //       const hodResponse = await fetch(
  //         `http://localhost:3000/api/faculty/facultyDetails?facultyId=${facultyid}`
  //       );
  //       const hodDetails = await hodResponse.json();
  //       console.log(hodDetails.data)
  //       setFacultyDetails(hodDetails.data);

  //     } else {
  //       throw new Error("Faculty ID not found in local storage");
  //     }
  //   };

  //   fetchHODDetails();
  // }, []);

  useEffect(() => {
    // Fetch data using facultyId
    async function fetchHODDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/faculty/facultyDetails?facultyId=${facultyId}`
        );
        const result = await response.json();

        if (response.ok) {
          setHodDetails(result.data);
        } else {
          setError(result.error || "Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching faculty details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (facultyId) {
      fetchHODDetails();
    }
  }, [facultyId]);

  useEffect(() => {
    async function fetchFacultyInSameDepartment() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/faculty/department?department=${hodDetails.department}`
        );
        const result = await response.json();

        if (response.ok) {
          setFacultyDetails(result.data);
        } else {
          setError(result.error || "Failed to fetch faculty details");
        }
      } catch (err) {
        console.error("Error fetching faculty details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (hodDetails?.department) {
      fetchFacultyInSameDepartment();
    }
  }, [hodDetails]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

      <div className="max-w-lg mx-auto p-4 bg-white rounded-md shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Faculty Details</h1>
        <p>
          <strong>Name:</strong> {facultyDetails.firstName}{" "}
          {facultyDetails.middleName} {facultyDetails.lastName}
        </p>
        <p>
          <strong>Qualification:</strong> {facultyDetails.qualification}
        </p>
        <p>
          <strong>Department:</strong> {facultyDetails.department}
        </p>
        <p>
          <strong>Designation:</strong> {facultyDetails.designation}
        </p>
      </div>
    </div>
  );
};

export default DynamicDashboard;

in the navigation cards section, i want to fetch the details of all the faculty from the hod's dept.  im already fetching the hod detiails in the useeffect, so u can reference the dept from there and get all the faculty who are in that dept. And display them in cards which should contain thier photo, firstname,lastname, contactNo, designation. And whn the login is principla, i want to fetch all the different branches to be fetched