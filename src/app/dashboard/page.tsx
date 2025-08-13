"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import madarText from "@/assets/register/مادر مارکت لاگین.png";
import madarLogo from "@/assets/register/مادر مارکت لوگو لاگین.png";
import HeaderLogo from "@/assets/head/Header Logo.png";

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
      <div className="flex justify-center gap-4 bg-gradient-to-br from-orange-50 to-orange-100 h-screen">
        <div className="fixed top-0">
          <header className="w-full flex flex-col items-centerpb-[24px] min-h-[72px]">
            <div className="w-[375px] h-[72px] bg-white shadow flex items-center justify-center gap-10 px-6 py-6">
              {/* Logo and Text */}
              <div className="flex gap-6 text-gray-500 font-bold text-[13px] items-center justify-center">
                <button className="cursor-pointer hover:text-gray-700">درباره ما</button>
                <button className="cursor-pointer hover:text-gray-700">تماس با ما</button>
                <button className="cursor-pointer hover:text-gray-700">اپلیکیشن</button>
              </div>
            </div>
          </header>
        </div>
        {isRegistered ? (
          <div className="flex flex-col items-center font-bold pb-5 pt-50">
            <div className="flex flex-col justify-center items-center mb-[49px]">
              <Image
                src={madarLogo}
                alt="لوگو مادر مارکت در صفحه لاگین"
                className=" h-[30px] w-[54px]"
              />
              <Image
                src={madarText}
                alt="متن مادر مارکت"
                className=" h-[18px] w-[93px] mt-[13px] mb-[4px]"
              />
              <p className="text-[16px] text-[#BA400B] font-bold">
                فروشگاه سوپر مارکتی{" "}
              </p>
            </div>
            <Link
              href="/home"
              className="bg-[#FF6A29] text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              فروشگاه مادر مارکت
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setTimeout(() => {
                  router.push("/login");
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
                router.push("/login");
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
