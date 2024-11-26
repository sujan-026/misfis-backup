"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-end gap-4 mr-4 mt-2 text-xl text-blue-500 font-bold">
      <Link
        className={`link hover:underline underline-offset-3 ${
          pathname === "/faculty/profile" ? "text-purple-500" : ""
        }`}
        href="/faculty"
      >
        Home
      </Link>
      <Link
        className={`link hover:underline underline-offset-3 ${
          pathname === "/faculty/profile" ? "text-purple-500" : ""
        }`}
        href="/faculty/profile/"
      >
        Personal Details
      </Link>
      <Link
        className={`link hover:underline underline-offset-3 ${
          pathname === "/faculty/profile/academic-details"
            ? "text-purple-500"
            : ""
        }`}
        href="/faculty/profile/academic-details"
      >
        Academic Details
      </Link>
      <Link
        className={`link hover:underline underline-offset-3 ${
          pathname === "/faculty/profile/research-details"
            ? "text-purple-500"
            : ""
        }`}
        href="/faculty/profile/research-details"
      >
        Research Details
      </Link>
    </nav>
  );
}
