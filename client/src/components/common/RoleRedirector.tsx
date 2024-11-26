"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RoleRedirectorProps {
  role: string;
}

const RoleRedirector: React.FC<RoleRedirectorProps> = ({ role }) => {
  const router = useRouter();

  useEffect(() => {
    if (role === "faculty") {
      router.push("/faculty");
    } else if (role === "hod") {
      router.push("/hod");
    } else if (role === "principal") {
      router.push("/principal");
    } else if (role === "admin") {
      router.push("/admin");
    } else {
      alert("Invalid Role");
      router.push("/login");
    }
  }, [role, router]);

  return <div>Redirecting...</div>;
};

export default RoleRedirector;
