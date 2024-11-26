"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

const PrincipalDashboard = () => {
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
        <h2 className="text-xl font-semibold mb-6">Principal Portal</h2>
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center p-3 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </a>
          {[
            {
              title: "Academic Overview",
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
            },
            {
              title: "Faculty Management",
              icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
            },
            {
              title: "Department Reports",
              icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
            },
            {
              title: "Performance Analytics",
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            },
            {
              title: "Timetable Management",
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Notifications",
              icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={item.icon}
                />
              </svg>
              {item.title}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Principal Dashboard</h2>
          <div className="flex space-x-4">
            <label htmlFor="academic-year" className="sr-only">
              Academic Year
            </label>
            <select id="academic-year" className="border rounded-lg px-4 py-2">
              <option>2023-24</option>
              <option>2022-23</option>
            </select>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
              Generate Report
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              onClick={() => router.push("/")}
            >
              Logout
            </button>
          </div>
        </div>

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
            <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
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

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Placement Statistics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={placementData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {placementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Research & Publications
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={researchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="publications" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              Schedule Faculty Meeting
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              Review Department Reports
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              View Pending Approvals
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrincipalDashboard;
