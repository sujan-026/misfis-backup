// components/FacultyCards.tsx
const FacultyCards: React.FC = () => {
  const facultyData = [
    { name: "John Doe", department: "CSE" },
    { name: "Jane Smith", department: "ECE" },
    { name: "Jane Smith", department: "ECE" },
    { name: "Jane Smith", department: "ECE" },
    { name: "Jane Smith", department: "ECE" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Faculty List
        </h3>
        <div className="h-64">
          {facultyData.map((faculty, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-lg transition"
            >
              <h3 className="font-semibold">{faculty.name}</h3>
              <p className="text-sm text-gray-500">{faculty.department}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyCards;
