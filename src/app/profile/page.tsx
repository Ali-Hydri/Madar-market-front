"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import HeaderLogo from "@/assets/head/Header Logo.png";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    lastname: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("خطا در پارس کردن userData:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-500">در حال بارگذاری...</p>
    );
  }

  return (
    <div className="w-[375px] mx-auto flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* HEADER */}
      <div className="fixed top-0">
        <header className="w-full flex flex-col items-center pb-[24px] min-h-[72px]">
          <div className="w-[375px] h-[72px] bg-white shadow flex items-center gap-10 px-6 py-6">
            {/* Logo and Text */}
            <div className="flex items-center select-none">
              {/* Arrow Icon */}
              <svg
                onClick={() => {
                  router.push("/home");
                }}
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
                <Image
                  src={HeaderLogo}
                  alt="لوگو"
                  className="h-[30px] w-[60px]"
                />{" "}
              </div>
            </div>
            <h2 className="text-lg font-bold">پروفایل</h2>

          </div>
        </header>
      </div>
      <div className="w-full p-8 max-w-md flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-6 ring-4 ring-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-orange-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#BA400B] mb-4">خوش آمدید</h1>

        <div className="w-full text-right space-y-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="text-sm text-gray-500">نام کاربری:</label>
            <p className="font-semibold text-gray-800 mt-1">
              {user.name} {user.lastname}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="text-sm text-gray-500">شماره همراه:</label>
            <p className="font-semibold text-gray-800 mt-1">{user.phone}</p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.push("/login");
          }}
          className="w-full mt-2 bg-red-400 hover:bg-red-500 text-gray-700 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          خروج از حساب کاربری
        </button>
      </div>
      <Footer />
    </div>
  );
}
