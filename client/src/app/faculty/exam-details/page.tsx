"use client";
import React from "react";
import Header from "@/components/dashboard/Header";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";

interface Course {
  code: string;
  credits: number;
  name: string;
  links: string;
}

const courses: Course[] = [
  { code: "DMS101", credits: 3, name: "Discrete Mathematics", links: "/Dms" },
  { code: "CS102", credits: 4, name: "Computer Science", links: "/Cs" },
  // Add more courses as needed
];
const Page = () => {
  const router = useRouter();

  return (
    <div>
      <Header />
      <NavBar title="Home" />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <div
            key={course.code}
            className="course-card p-4 border rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/faculty/exam-details/${course.links}`)}
          >
            <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
            <p className="text-gray-700">Code: {course.code}</p>
            <p className="text-gray-700">Credits: {course.credits}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
