// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Header from "@/components/reports/Header";
// import Sidebar from "@/components/reports/SideBar";
// import DashboardOverview from "@/components/reports/Overview";
// import FacultyCards from "@/components/reports/Facultycards";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// const HodDashboard = () => {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Overview");

//   const academicData = [
//     { department: "CSE", cgpa: 8.5 },
//     { department: "ECE", cgpa: 8.2 },
//     { department: "MECH", cgpa: 7.9 },
//     { department: "CIVIL", cgpa: 8.1 },
//     { department: "EEE", cgpa: 8.0 },
//   ];

//   const attendanceData = [
//     { department: "CSE", attendance: 85 },
//     { department: "ECE", attendance: 82 },
//     { department: "MECH", attendance: 78 },
//     { department: "CIVIL", attendance: 80 },
//     { department: "EEE", attendance: 83 },
//   ];

//   const placementData = [
//     { name: "Placed", value: 65, color: "#4F46E5" },
//     { name: "Higher Studies", value: 20, color: "#7C3AED" },
//     { name: "Entrepreneurs", value: 10, color: "#A78BFA" },
//     { name: "Unplaced", value: 5, color: "#C4B5FD" },
//   ];

//   const researchData = [
//     { year: "2020", publications: 45 },
//     { year: "2021", publications: 52 },
//     { year: "2022", publications: 60 },
//     { year: "2023", publications: 75 },
//     { year: "2024", publications: 68 },
//   ];

//   return (
//     <div className="flex">
//       <aside className="w-64 text-white p-4 bg-gradient-to-b from-indigo-600 to-purple-600">
//         <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
//       </aside>

//       <main className="flex-1 p-8 bg-gray-50">
//         <Header onTabChange={setActiveTab} />

//         <div className="flex flex-wrap gap-4 mb-6">
//           <label htmlFor="branch-select" className="sr-only">
//             Branch
//           </label>
//           <select id="branch-select" className="border rounded-lg px-4 py-2">
//             <option value="all">All Branches</option>
//             <option value="cse">Computer Science</option>
//             <option value="ece">Electronics</option>
//             <option value="mech">Mechanical</option>
//             <option value="civil">Civil</option>
//           </select>
//           <label htmlFor="semester-select" className="sr-only">
//             Semester
//           </label>
//           <select id="semester-select" className="border rounded-lg px-4 py-2">
//             <option value="all">All Semesters</option>
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//               <option key={sem} value={sem}>
//                 Semester {sem}
//               </option>
//             ))}
//           </select>
//           <label htmlFor="section-select" className="sr-only">
//             Section
//           </label>
//           <select id="section-select" className="border rounded-lg px-4 py-2">
//             <option value="all">All Sections</option>
//             <option value="A">Section A</option>
//             <option value="B">Section B</option>
//             <option value="C">Section C</option>
//           </select>
//         </div>

//         <div className="border-b border-gray-200 mb-6">
//           <nav className="flex space-x-8">
//             {[
//               "Overview",
//               "Academics",
//               "Attendance",
//               "Performance",
//               "Faculty",
//               "Infrastructure",
//               "Kill me",
//             ].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 ${
//                   activeTab === tab
//                     ? "border-b-2 border-indigo-600 text-indigo-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">
//               Academic Performance Trends
//             </h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={academicData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="department" />
//                   <YAxis domain={[7, 9]} />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="cgpa" stroke="#4F46E5" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={attendanceData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="department" />
//                   <YAxis domain={[0, 100]} />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="attendance" fill="#7C3AED" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Placement Statistics</h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={placementData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     label
//                   >
//                     {placementData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">
//               Research & Publications
//             </h3>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={researchData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="year" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="publications" fill="#4F46E5" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//           <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//               Schedule Faculty Meeting
//             </button>
//             <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//               Review Department Reports
//             </button>
//             <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//               View Pending Approvals
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HodDashboard;




"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/reports/Header";
import Sidebar from "@/components/reports/SideBar";
import DashboardOverview from "@/components/reports/Overview";
import FacultyCards from "@/components/reports/Facultycards";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const HodDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");

  const academicData = [
    { department: "CSE", cgpa: 8.5 },
    { department: "ECE", cgpa: 8.2 },
    { department: "MECH", cgpa: 7.9 },
    { department: "CIVIL", cgpa: 8.1 },
    { department: "EEE", cgpa: 8.0 },
  ];

  const attendanceData = [
    { department: "CSE", attendance: 85 },
    { department: "ECE", attendance: 82 },
    { department: "MECH", attendance: 78 },
    { department: "CIVIL", attendance: 80 },
    { department: "EEE", attendance: 83 },
  ];

  const placementData = [
    { name: "Placed", value: 65, color: "#4F46E5" },
    { name: "Higher Studies", value: 20, color: "#7C3AED" },
    { name: "Entrepreneurs", value: 10, color: "#A78BFA" },
    { name: "Unplaced", value: 5, color: "#C4B5FD" },
  ];

  const researchData = [
    { year: "2020", publications: 45 },
    { year: "2021", publications: 52 },
    { year: "2022", publications: 60 },
    { year: "2023", publications: 75 },
    { year: "2024", publications: 68 },
  ];

  return (
    <div className="flex">
      <aside className="w-64 text-white p-4 bg-gradient-to-b from-indigo-600 to-purple-600">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        <Header onTabChange={setActiveTab} />

        <div className="flex flex-wrap gap-4 mb-6">
          <label htmlFor="branch-select" className="sr-only">
            Branch
          </label>
          <select id="branch-select" className="border rounded-lg px-4 py-2">
            <option value="all">All Branches</option>
            <option value="cse">Computer Science</option>
            <option value="ece">Electronics</option>
            <option value="mech">Mechanical</option>
            <option value="civil">Civil</option>
          </select>
          <label htmlFor="semester-select" className="sr-only">
            Semester
          </label>
          <select id="semester-select" className="border rounded-lg px-4 py-2">
            <option value="all">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
          <label htmlFor="section-select" className="sr-only">
            Section
          </label>
          <select id="section-select" className="border rounded-lg px-4 py-2">
            <option value="all">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              "Overview",
              "Academics",
              "Attendance",
              "Performance",
              "Faculty",
              "Infrastructure",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 ${
                  activeTab === tab
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Academic Performance Trends
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={academicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis domain={[7, 9]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cgpa" stroke="#4F46E5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Attendance Overview
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendance" fill="#7C3AED" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Faculty" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
             <div >
              <FacultyCards />
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HodDashboard;
