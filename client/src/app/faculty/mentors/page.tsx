import Header from "@/components/ui/header";
import MentorOptions from "@/components/faculty/ui/MentorOptions";
const students = [
  {
    id: 1,
    usn: "1DA25CS001",
    name: "Newton",
    branch: "CSE",
    semester: 5,
    section: "A",
  },
  {
    id: 2,
    usn: "1DA25CS002",
    name: "Bose",
    branch: "CSE",
    semester: 5,
    section: "A",
  },
  {
    id: 3,
    usn: "1DA25CS003",
    name: "Einstein",
    branch: "CSE",
    semester: 5,
    section: "A",
  },
  {
    id: 4,
    usn: "1DA25CS004",
    name: "Rutherford",
    branch: "CSE",
    semester: 5,
    section: "A",
  },
  // Add more students as needed
];

export default function MyStudent() {
  return (
    <div>
      <Header title="Mentor" />
      <MentorOptions />
      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          My Students List
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  SL NO
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  USN
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Branch
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Semester
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Section
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {students.map((student, index) => (
                <tr key={student.id} className="odd:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {student.usn}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {student.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {student.branch}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {student.semester}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {student.section}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}