"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MentorOptions = () => {
  const pathname = usePathname();
  // Function to check if the button should be active
  const isActive = (path: string) => pathname === path;
  return (
    <div className="flex justify-center bg-white space-x-4 mt-6 mb-10">
      <Link
        href="/faculty"
        className={`px-6 py-2 rounded-full text-white font-medium ${
          isActive("/faculty")
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "bg-gray-300"
        }`}
      >
        Home
      </Link>
      <Link
        href="/faculty/mentors/"
        className={`px-6 py-2 rounded-full text-white font-medium ${
          isActive("/faculty/mentors")
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "bg-gray-300"
        }`}
      >
        My Students List
      </Link>

      <Link
        href="/faculty/mentors/Attendance"
        className={`px-6 py-2 rounded-full text-white font-medium ${
          isActive("/faculty/mentors/Attendance")
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "bg-gray-300"
        }`}
      >
        Attendance Page
      </Link>

      <Link
        href="/faculty/mentors/academic-details"
        className={`px-6 py-2 rounded-full text-white font-medium ${
          isActive("/faculty/mentors/academic-details")
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "bg-gray-300"
        }`}
      >
        Academic Details
      </Link>

      <Link
        href="/faculty/mentors/course-list"
        className={`px-6 py-2 rounded-full text-white font-medium ${
          isActive("/faculty/mentors/course-list")
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "bg-gray-300"
        }`}
      >
        Course List
      </Link>
    </div>
  );
};

export default MentorOptions;
