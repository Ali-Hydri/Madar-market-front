"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center border border-green-100">
        <div className="relative w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 ring-4 ring-white">
          <div className="absolute -left-40 bottom-20">
            <Link
              className=" text-red-400 flex gap-1 cursor-pointer"
              href={"/dashboard"}
            >
              بازگشت
              <ArrowLeft className="ml-1 w-4 h-4 mt-1" />
            </Link>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500"
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
        <h1 className="text-2xl font-bold text-green-700 mb-4">خوش آمدید</h1>

        <div className="w-full text-right space-y-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="text-sm text-gray-500">نام کاربری</label>
            <p className="font-semibold text-gray-800 mt-1">
              {user.name} {user.lastname}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="text-sm text-gray-500">شماره همراه</label>
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
    </div>
  );
}
