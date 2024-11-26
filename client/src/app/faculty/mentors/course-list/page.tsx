import MentorOptions from "@/components/faculty/ui/MentorOptions";
import Header from "@/components/ui/header";

// pages/course-list.tsx
const studentsWithCourses = [
    { id: 1, name: 'Student 1', courses: ['Math', 'English', 'History'] },
    { id: 2, name: 'Student 2', courses: ['Science', 'Geography', 'Math'] },
    { id: 3, name: 'Student 3', courses: ['Math', 'Chemistry'] },
    // Add more students and courses
  ];
  
  export default function CourseList() {
    return (
      <div>
        <Header title="Faculty" />
        <MentorOptions />
      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-2xl font-bold mb-6">Course List</h1>
        <ul className="bg-white p-6 shadow-md rounded-lg">
          {studentsWithCourses.map((student) => (
            <li key={student.id} className="p-4 border-b last:border-none">
              <h3 className="font-semibold">{student.name}</h3>
              <ul className="pl-4 mt-2 list-disc">
                {student.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  }
  