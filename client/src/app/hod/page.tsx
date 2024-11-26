"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <Dashboard />
      <button onClick={() => router.push("/hod/reports")}>Reports</button>
    </div>
  );
};

export default Page;
