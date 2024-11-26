"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import drait from "@/assets/full_logo-wide.png";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false); // Track forgot password mode
  const [role, setRole] = useState("faculty"); // Default role
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState(""); // For forgot password email
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);


    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        const decodedToken = jwtDecode(token);

        const user = {
          id: decodedToken.facultyId,
          username: decodedToken.username,
          role: decodedToken.role,
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(decodedToken));

        if (user.role === "faculty") {
          router.push("/faculty");
        } else if (user.role === "hod") {
          router.push("/hod");
        } else if (user.role === "principal") {
          router.push("/principal");
        } else if (user.role === "admin") {
          router.push("/admin");
        } else {
          setError("Invalid user role");
        }
      } else {
        const { message } = await response.json();
        setError(message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const getHeader = () => {
    switch (role) {
      case "faculty":
        return "Faculty Login";
      case "hod":
        return "HOD/Principal Login";
      case "admin":
        return "Admin Login";
      default:
        return "Login";
    }
  };

  const getPlaceholders = () => {
    switch (role) {
      case "faculty":
        return {
          username: "Enter Faculty ID",
          password: "Enter Faculty Password",
        };
      case "hod":
        return {
          username: "Enter HOD/Principal ID",
          password: "Enter Password",
        };
      case "admin":
        return { username: "Enter Admin ID", password: "Enter Admin Password" };
      default:
        return { username: "Enter Username", password: "Enter Password" };
    }
  };

  const { username: usernamePlaceholder, password: passwordPlaceholder } =
    getPlaceholders();

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-cover bg-center background-image">
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <div className="text-center mb-6">
            <Image
              src={drait}
              alt="drait logo"
              width={500}
              height={50}
              className="h-16"
            />
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* Dynamic Header */}
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
            {getHeader()}
          </h2>

          {forgotPassword ? (
            // Forgot Password Form
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                className="w-full mt-4 text-blue-600 hover:underline"
                onClick={() => setForgotPassword(false)}
              >
                Back to Login
              </button>
            </form>
          ) : (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div className="flex justify-around mb-6">
                <button
                  className={`px-4 py-2 rounded-md ${
                    role === "faculty"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => setRole("faculty")}
                >
                  Faculty
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    role === "hod"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => setRole("hod")}
                >
                  HOD/Principal
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    role === "admin"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => setRole("admin")}
                >
                  Admin
                </button>
              </div>

              {/* Username Field */}
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={usernamePlaceholder}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={passwordPlaceholder}
                  required
                />
                <div
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 px-2 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                  onClick={() => setForgotPassword(true)}
                >
                  FORGOT PASSWORD
                </button>
                <button
                  type="submit"
                  className="flex-1 px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  LOGIN
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 px-2 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                  onClick={() => router.push("faculty/faculty_reg")}
                >
                  Faculty Registration
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;