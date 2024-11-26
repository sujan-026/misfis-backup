// components/Header.tsx
"use client";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onTabChange }) => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Hod Dashboard</h2>
      <div className="flex space-x-4">
        <select id="academic-year" className="border rounded-lg px-4 py-2">
          <option>2023-24</option>
          <option>2022-23</option>
        </select>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          onClick={() => router.push("/")}
        >
          Logout
        </button>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          onClick={() => onTabChange("Faculty")}
        >
          Faculty
        </button>
      </div>
    </div>
  );
};

export default Header;
