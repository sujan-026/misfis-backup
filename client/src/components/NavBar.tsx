// import React from 'react';
// import Image from "next/image";
// import drait from "@/assets/full_logo-wide.png";
// import { usePathname } from "next/navigation";
// import Link from "next/link";

// interface HeaderProps {
//   title: string;
//   navLinksHome: string; 
// }

// const NavBar = ({ title, navLinksHome }: HeaderProps) => {
//   const pathname = usePathname();

//   return (
//     <div>
//       <header className="bg-gradient-to-r from-white from-25% via-blue-500 to-purple-600 flex flex-col gap-y-2 sm:flex-row items-center justify-between px-4 py-2 ">
//         <div className="flex-start">
//           <Image src={drait} width={400} height={500} alt="drait logo wide" />
//         </div>
//         <div className="text-white font-bold text-3xl">{title}</div>
//       </header>

//       <nav className="flex items-center justify-end gap-4 mr-4 mt-2 text-xl text-blue-500 font-bold">
//         <Link
//           className={`link hover:underline underline-offset-3 ${
//             pathname === "/" ? "text-purple-500" : ""
//           }`}
//           href="/faculty"
//         >
//           {navLinksHome}
//         </Link>
//         {/* <Link
//           className={`link hover:underline underline-offset-3 ${
//             pathname === "/" ? "text-purple-500" : ""
//           }`}
//           href="/faculty_reg"
//         >
//           {navLinks}
//         </Link> */}

//         <Link
//           className={`link hover:underline underline-offset-3 ${
//             pathname === "/academic-details" ? "text-purple-500" : ""
//           }`}
//           href="/academic-details"
//         >
//           Academic Details
//         </Link>
//         <Link
//           className={`link hover:underline underline-offset-3 ${
//             pathname === "/research-details" ? "text-purple-500" : ""
//           }`}
//           href="/research-details"
//         >
//           Research Details
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default NavBar;

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from 'react'

interface NavBarProps {
    title: string;
}

const NavBar = ({ title }: NavBarProps) => {
  const pathname = usePathname();
  // Function to check if the button should be active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex justify-center bg-white space-x-4 mt-6 mb-10">
      <Link
        href="/faculty"
        className={`px-6 py-2 rounded-full text-white font-medium ${
          isActive("/faculty")
            ? "bg-gradient-to-r from-purple-500 to-blue-500"
            : "bg-gray-300"
        }`}
      >
        {title}
      </Link>
    </div>
  );
};

export default NavBar