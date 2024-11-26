import React from "react";
import Image from "next/image";
import drait from "@/assets/full_logo-wide.png";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div>
      <header className="bg-gradient-to-r from-white from-25% via-blue-500 to-purple-600 flex flex-col gap-y-2 sm:flex-row items-center justify-between px-4 py-2 ">
        <div className="flex-start">
          <Image src={drait} width={400} height={500} alt="drait logo wide" />
        </div>
        <div className="text-white font-bold text-3xl">{title}</div>
      </header>
      <nav>
        
      </nav>
    </div>
  );
};

export default Header;
