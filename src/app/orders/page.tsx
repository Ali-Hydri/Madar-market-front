"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import HeaderLogo from "@/assets/head/Header Logo.png";

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    // مرتب کردن از جدید به قدیم
    const sortedOrders = [...savedOrders].reverse();

    setOrders(sortedOrders);
  }, []);

  return (
    <div className="w-[375px] mx-auto bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen flex flex-col">
      {/* HEADER */}
      <div className="fixed top-0 z-10">
        <header className="w-full flex flex-col items-center pb-[24px] min-h-[72px]">
          <div className="w-[375px] h-[72px] bg-white shadow flex items-center gap-10 px-6 py-6">
            <div className="flex items-center select-none">
              <svg
                onClick={() => {
                  router.push("/home");
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 cursor-pointer"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="#B0B0B0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <Image
                  src={HeaderLogo}
                  alt="لوگو"
                  className="h-[30px] w-[60px]"
                />
              </div>
            </div>
            <h2 className="text-lg font-bold">سفارش‌ها</h2>
          </div>
        </header>
      </div>

      {/* محتوا */}
      <div className="flex-1 mt-[90px] px-4 pb-20">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <p className="mt-4 text-lg font-semibold">هیچ سفارشی ثبت نشده است</p>
            <button
              onClick={() => router.push("/home")}
              className="mt-6 px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all cursor-pointer"
            >
              رفتن به فروشگاه
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4 flex items-center gap-4"
              >
                <div className="relative w-16 h-16 rounded overflow-hidden">
                  <Image
                    src={`/images/products/${order.imageUrl}.png`}
                    alt={order.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{order.name}</h3>
                  <p className="text-sm text-gray-600">{order.originalPrice} تومان</p>
                  <p className="text-xs text-gray-400">{order.quantity} عدد</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date().toLocaleDateString("fa-IR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
