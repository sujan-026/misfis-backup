// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import FacultyDashboard from "@/components/dashboard/facultyDashboard";

// interface Faculty {
//   facultyId: string;
//   firstName: string;
//   lastName: string;
//   dept: string;
// }

// const Dashboard = () => {
//   const [role, setRole] = useState("");
//   const [facultyId, setFacultyId] = useState("");
//   const [teacherName, setTeacherName] = useState("");
  
//   const [facultyData, setFacultyData] = useState<Faculty[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const { role, facultyId } = JSON.parse(token);
//       console.log(role, facultyId);
//       setRole(role);
//       setFacultyId(facultyId);
//       setTeacherName(localStorage.getItem("username") || "User");
//     } else {
//       router.push("/login");
//     }
//   }, []);

//   // useEffect(() => {
//   //   if (role === "HOD") {
//   //     fetch(`/api/facultyacademicdetails?department= Computer Science`) // HOD's faculty list
//   //       .then((res) => res.json())
//   //       .then((data) => setFacultyData(data?.data || []));
//   //   } else if (role === "PRINCIPAL") {
//   //     fetch("/api/facultypersonalDetails") // Principal's all faculty list
//   //       .then((res) => res.json())
//   //       .then((data) => setFacultyData(data?.data || []));
//   //   }
//   // }, [role, facultyId]);

//   setFacultyData([
//     {
//       facultyId: "4235",
//       firstName: "John",
//       lastName: "Doe",
//       dept: "Computer Science",
//     },
//     {
//       facultyId: "4236",
//       firstName: "Jane",
//       lastName: "Smith",
//       dept: "Computer Science",
//     },
//     {
//       facultyId: "4237",
//       firstName: "Alice",
//       lastName: "Johnson",
//       dept: "Computer Science",
//     },
//   ]);


//   const renderFacultyCards = () =>
//     facultyData.map((faculty: any) => (
//       <button
//         key={faculty.facultyId}
//         className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4"
//         onClick={() =>
//           router.push(
//             `/faculty/profile?facultyId=${faculty.facultyId}`
//           )
//         }
//       >
//         {faculty.firstName} {faculty.lastName}
//       </button>
//     ));

//   if (role === "faculty") {
//     return (
//       <div>
//         <FacultyDashboard />
//       </div>
//     );
//   }

//   if (role === "hod" || role === "principal") {
//     return (
//       <div>
//         <h2>Welcome, {teacherName}</h2>
//         <div>{role === "hod" ? "Department Faculty" : "All Faculty"}</div>
//         <div className="grid grid-cols-3 gap-4">{renderFacultyCards()}</div>
//       </div>
//     );
//   }

//   if (role === "admin") {
//     return (
//       <div>
//         <h2>Admin Dashboard</h2>
//         <button onClick={() => router.push("/admin/test")}>
//           Manage Faculty
//         </button>
//         <button onClick={() => router.push("/admin/test")}>Reports</button>
//       </div>
//     );
//   }

//   return <div>Loading...</div>;
// };

// export default Dashboard;


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FacultyDashboard from "@/components/dashboard/facultyDashboard";
import DynamicDashboard from "@/components/dashboard/DynamicDashboard";
import Header from "@/components/dashboard/Header";

interface Faculty {
  facultyId: string;
  firstName: string;
  lastName: string;
  dept: string;
}

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { role, facultyId, username } = JSON.parse(token);
      console.log(role, facultyId);
      setRole(role);
      setFacultyId(facultyId);
      setTeacherName(username);
    } else {
      router.push("/login");
    }
  }, [router]);

  // Set faculty data only once after the component mounts
  useEffect(() => {
    setFacultyData([
      {
        facultyId: "4235",
        firstName: "John",
        lastName: "Doe",
        dept: "Computer Science",
      },
      {
        facultyId: "4236",
        firstName: "Jane",
        lastName: "Smith",
        dept: "Computer Science",
      },
      {
        facultyId: "4237",
        firstName: "Alice",
        lastName: "Johnson",
        dept: "Computer Science",
      },
    ]);
  }, []);

  const renderFacultyCards = () =>
    facultyData.map((faculty: any) => (
      <button
        key={faculty.facultyId}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4"
        onClick={() =>
          router.push(
            `/faculty/profile?facultyId=4235`
          )
        }
      >
        {faculty.firstName} {faculty.lastName}
      </button>
    ));

  if (role === "faculty") {
    return (
      <div>
        <FacultyDashboard />
      </div>
    );
  }

  if (role === "hod" || role === "principal") {
    return (
      <div>
        {!document.querySelector("header") && <Header />}
        <DynamicDashboard />
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <button onClick={() => router.push("/admin/test")}>
          Manage Faculty
        </button>
        <button onClick={() => router.push("/admin/test")}>Reports</button>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default Dashboard;
