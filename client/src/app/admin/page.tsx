"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import {useRouter} from 'next/navigation';

interface User {
  id?: number;
  username: string;
  password: string;
  role: string;
  facultyId?: string;
}

export default function AdminUserManagement() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<"add" | "table">("table");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Fetch Users
  async function fetchUsers() {
    try {
      const response = await fetch("/api/admin");
      if (!response.ok) throw new Error("Failed to fetch users.");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Delete
  async function handleDelete(id: number) {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Failed to delete user.");
      alert("User deleted successfully.");
      await fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  }

  // Close Modal on Outside Click
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setEditUser(null);
      setActiveView("table");
    }
  };

  useEffect(() => {
    if (editUser || activeView === "add") {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editUser, activeView]);

  // Filter Users
  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => (roleFilter === "All" ? true : user.role === roleFilter));

  return (
    <div className="container mx-auto p-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-4 bg-gray-100 p-3 rounded-lg shadow">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <div className="flex space-x-3">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeView === "add"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveView("add")}
          >
            Add User
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeView === "table"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveView("table")}
          >
            View Table
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeView === "table"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => router.push("/")}
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {/* Table View */}
      {activeView === "table" && (
        <motion.div>
          <div className="flex justify-between items-center mb-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                placeholder="Search..."
                className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
                name="search"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="size-6 absolute top-3 right-3 text-gray-500"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>

            {/* Role Filter */}
            <select
              className="px-4 py-2 border rounded-md shadow-sm"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="All">All Roles</option>
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="hod">HOD</option>
              <option value="principal">Principal</option>
            </select>
          </div>

          <motion.div
            className="overflow-x-auto shadow-lg rounded-lg bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <motion.tbody layout>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-gray-50 border-b last:border-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{user.username}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : user.role === "faculty"
                            ? "bg-blue-100 text-blue-700"
                            : user.role === "hod"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-3">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-lg"
                        onClick={() => setEditUser(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-lg"
                        onClick={() => handleDelete(user.id!)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </motion.div>
        </motion.div>
      )}

      {/* Add/Edit User Form */}
      {(activeView === "add" || editUser) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            className="w-2/3 max-w-lg bg-white p-8 shadow-lg rounded-md"
            ref={modalRef}
          >
            <UserForm
              editUser={editUser}
              setEditUser={setEditUser}
              setUsers={setUsers}
              closeForm={() => {
                setEditUser(null);
                setActiveView("table");
              }}
              setErrorMessage={setErrorMessage}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function UserForm({
  editUser,
  setEditUser,
  setUsers,
  closeForm,
  setErrorMessage,
}: {
  editUser: User | null;
  setEditUser: any;
  setUsers: any;
  closeForm: () => void;
  setErrorMessage: (message: string) => void;
}) {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
    role: "faculty",
    facultyId: "",
  });

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    }
  }, [editUser]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const method = editUser ? "PUT" : "POST";
      const url = "/api/admin";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.error || "Failed to save user details.");
        return;
      }

      const data = await response.json();
      setUsers((prev: User[]) =>
        editUser
          ? prev.map((user) => (user.id === editUser.id ? data : user))
          : [...prev, data]
      );

      alert(editUser ? "User updated successfully." : "User added successfully.");
      setFormData({ username: "", password: "", role: "faculty", facultyId: "" });
      setErrorMessage("");
      closeForm(); // Close the form after successful submission
    } catch (error) {
      setErrorMessage("Error saving user details.");
      console.error("Error saving user details:", error);
      alert("An error occurred while saving user details.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium">Faculty ID:</label>
        <input
          type="text"
          name="facultyId"
          className="w-full p-3 border rounded-md"
          value={formData.facultyId || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, facultyId: e.target.value }))
          }
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Username:</label>
        <input
          type="text"
          name="username"
          className="w-full p-3 border rounded-md"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Password:</label>
        <input
          type="password"
          name="password"
          className="w-full p-3 border rounded-md"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Role:</label>
        <select
          name="role"
          className="w-full p-3 border rounded-md"
          value={formData.role}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, role: e.target.value }))
          }
        >
          <option value="admin">Admin</option>
          <option value="faculty">Faculty</option>
          <option value="hod">HOD</option>
          <option value="principal">Principal</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
      >
        {editUser ? "Update User" : "Create User"}
      </button>
      {editUser && (
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-gray-300 rounded-md w-full"
          onClick={() => closeForm()}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
