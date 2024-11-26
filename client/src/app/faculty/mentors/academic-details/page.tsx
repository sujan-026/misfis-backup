// pages/academic-details.tsx
"use client";
import MentorOptions from '@/components/faculty/ui/MentorOptions';
import Header from '@/components/ui/header';
import Head from 'next/head';
import { useState } from 'react';

const students = [
  { id: 1, name: 'Student 1', grade: 85 },
  { id: 2, name: 'Student 2', grade: 40 },
  { id: 3, name: 'Student 3', grade: 72 },
  // Add more students with grades
];

export default function AcademicDetails() {
  const [filterFailed, setFilterFailed] = useState(false);

  const filteredStudents = filterFailed
    ? students.filter((student) => student.grade < 50)
    : students;

  return (
    <div>
      <Header title="Mentor" />
      <MentorOptions />
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">Academic Details</h1>
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={filterFailed}
          onChange={() => setFilterFailed(!filterFailed)}
        />
        Show Failed Students Only
      </label>
      <ul className="bg-white p-6 shadow-md rounded-lg">
        {filteredStudents.map((student) => (
          <li key={student.id} className="p-2 border-b last:border-none">
            {student.name} - Grade: {student.grade}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
