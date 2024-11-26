"use client";
import { useState } from "react";
import Header from "@/components/ui/header";
import { NavLinks } from "@/components/faculty/ui/nav-links";

// Dummy data for attendance
const initialAttendanceData = [
  {
    id: 1,
    name: "Newton",
    usn: "1DA25CS001",
    Cie1: 20,
    Cie2: 20,
    Cie3: "-",
    See: 85,
    grade: "A+",
    result: "pass",
  },
  {
    id: 2,
    name: "Bose",
    usn: "1DA25CS002",
    Cie1: 15,
    Cie2: 19,
    Cie3: "-",
    See: 78,
    grade: "A",
    result: "pass",
  },
  {
    id: 3,
    name: "Einstein",
    usn: "1DA25CS003",
    Cie1: 9,
    Cie2: 3,
    Cie3: 10,
    See: 27,
    grade: "F",
    result: "fail",
  },
  {
    id: 4,
    name: "Rutherford",
    usn: "1DA25CS004",
    Cie1: 1,
    Cie2: 10,
    Cie3: 10,
    See: 28,
    grade: "F",
    result: "pass",
  },
];

const Attendance = () => {
  const [attendanceData] = useState(initialAttendanceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAbsentees, setShowAbsentees] = useState(false); // State for filtering absentees

  // Filter students by name or last 3 digits of the USN
  const filteredStudents = attendanceData.filter((student) => {
    const usnLastThreeDigits = student.usn.slice(-3);
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usnLastThreeDigits.includes(searchTerm)
    );
  });

  // Filter based on absentee status
  const displayedStudents = showAbsentees
    ? filteredStudents.filter((student) => student.result === "fail")
    : filteredStudents;

  return (
    <div>
      <Header title="Attendance Management" />
      <NavLinks />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-end mb-4">
          {/* Search Filter */}
          <div className="relative">
            <form
              className="form relative"
              onSubmit={(e) => e.preventDefault()}
            >
              <button
                className="absolute left-2 -translate-y-1/2 top-1/2 p-1"
                type="button"
                title="Search"
              >
                <svg
                  width="17"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="search"
                  className="w-5 h-5 text-gray-700"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <input
                className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                placeholder="Search..."
                required
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button" // Change to type="button" to prevent form submission
                className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
                onClick={() => setSearchTerm("")} // Clear the searchTerm on click
                title="Clear Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th colSpan={7} className="text-center w-full py-2 font-bold">
                Maths | A Section | CSE
              </th>
              <th className="text-right py-2 px-4 flex items-end justify-end">
                <button
                  onClick={() => setShowAbsentees((prev) => !prev)}
                  className="flex items-end justify-center gap-2 text-black font-bold py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200 duration-300"
                  style={{ width: "200px" }} // Fixed width for the button
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 12h8m-8 4h4"
                    />
                  </svg>
                  {showAbsentees ? "Show All" : "Show Failures"}
                </button>
              </th>
            </tr>
            <tr>
              <th className="py-2 px-4">SL No</th>
              <th className="py-2 px-4">USN</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">CIE-1</th>
              <th className="py-2 px-4">CIE-2</th>
              <th className="py-2 px-4">CIE-3</th>
              <th className="py-2 px-4">SEE</th>
              <th className="py-2 px-4">Grades</th>
            </tr>
          </thead>

          <tbody>
            {displayedStudents.map((student, index) => {
              return (
                <tr key={student.id} className="text-center">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{student.usn}</td>
                  <td className="py-2 px-4 font-semibold">{student.name}</td>
                  <td className="py-2 px-4">{student.Cie1}</td>
                  <td className="py-2 px-4">{student.Cie2}</td>
                  <td className="py-2 px-4">{student.Cie3}</td>
                  <td className="py-2 px-4">{student.See}</td>
                  <td className="py-2 px-4">{student.grade}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`${
                        student.result === "pass"
                          ? "text-green-500"
                          : student.result === "fail"
                          ? "text-yellow-500"
                          : "text-red-500"
                      } font-bold`}
                    ></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4 flex justify-center">
          <div className="flex gap-2 bg-white shadow-md rounded-lg p-4 border border-gray-300">
            <div className="flex items-center text-black font-weight-500">
              Pass:
            </div>
            <div className="text-green-600 font-bold text-xl">
              {attendanceData.filter((d) => d.result === "pass").length}
            </div>
            <div className="flex items-center text-black font-weight-500">
              Fail:
            </div>
            <div className="text-red-500 font-bold text-xl">
              {attendanceData.filter((d) => d.result === "fail").length}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
