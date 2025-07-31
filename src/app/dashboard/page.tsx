"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardActions() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const registered = localStorage.getItem("isRegistered");
      setIsRegistered(registered === "true");
    };

    handleStorageChange(); // اولین بار اجرا میشه

    // اگه از پنجره‌های دیگه هم تغییر کرد:
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const registered = localStorage.getItem("isRegistered");
    if (registered !== null) {
      setIsRegistered(registered === "true");
    }
  }, []);

  const router = useRouter();

  if (isRegistered === null) {
    return <div>در حال بارگذاری...</div>;
  }
  return (
    <>
    <div className="flex justify-center gap-4 bg-gradient-to-br from-green-50 to-green-100 h-screen">
      {isRegistered ? (
        <div className="flex flex-col items-center font-bold pb-5 pt-50">
          <Link
            href="/profile"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            مشخصات
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setTimeout(() => {
                router.push("/home");
              }, 1000);
            }}
            className="w-[170px] mt-2 bg-red-400 hover:bg-red-500 text-gray-700 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            خروج از حساب کاربری
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="font-bold pb-5 pt-50">
            لطفا ابتدا مراحل احراز هویت خود را تکمیل کنید
          </p>
          <Link
            href="/register"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-[170px] text-center"
          >
            تکمیل احراز هویت
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              router.push("/home");
            }}
            className="w-[170px] mt-2 bg-red-400 hover:bg-red-500 text-gray-700 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            خروج از حساب کاربری
          </button>
        </div>
      )}
    </div>
      </>
  );
}
