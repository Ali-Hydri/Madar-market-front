"use client";
import Image from "next/image";
import React, { useState } from "react";
import HeaderLogo from "@/assets/head/Header Logo.png";
import { RiShoppingBasket2Line } from "react-icons/ri";
import CartModal from "../CartModal/cartModal";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";


const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();


  return (
    <header className="w-full flex flex-col items-center pb-[24px] min-h-[72px]">
      {/* Main header box */}
      <div className="w-[375px] h-[72px] bg-white shadow flex items-center justify-between px-6 py-6">
        {/* Logo and Text */}
        <div className="flex items-center select-none">
          {/* Arrow Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="#B0B0B0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Logo */}
          <div>
            <Image src={HeaderLogo} alt="لوگو" className="h-[30px] w-[60px]" />{" "}
          </div>
        </div>
        {/* Basket Icon */}
        <div className="flex gap-2">
          <button
            onClick={() => {router.push("/login")}}
            className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px] border border-gray-300 cursor-pointer"
          >
            {/* Basket SVG */}
            <FaRegUser className="text-[#C0C0C0]" />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px] border border-gray-300 cursor-pointer"
          >
            {/* Basket SVG */}
            <RiShoppingBasket2Line className="text-[#C0C0C0]" />
          </button>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Box */}
      <div className="w-full">
        <div className="mt-[8px] w-[327px] h-[40px] flex items-center bg-white rounded-2xl border border-gray-200 px-6 mx-6 py-4 shadow-sm">
          {/* Search Icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="13" cy="13" r="8" stroke="#D1D5DB" strokeWidth="2" />
            <path
              d="M21 21l-3.5-3.5"
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="جستجو"
            className="flex-1 bg-transparent outline-none text-lg text-gray-500 placeholder-gray-300 text-right pr-2 "
            dir="rtl"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
