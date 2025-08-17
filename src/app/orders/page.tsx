"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Footer from "@/components/footer/footer";
import Image from "next/image";
import HeaderLogo from "@/assets/head/Header Logo.png";

interface OrderItem {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  quantity: number;
}

interface Order {
  id: number;
  date: string;
  items: OrderItem[];
  totalPrice: number;
  itemCount: number;
}

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    // مرتب کردن از جدید به قدیم
    const sortedOrders = [...savedOrders].reverse();

    setOrders(sortedOrders);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  // نمایش جزئیات سفارش
  if (selectedOrder) {
    return (
      <div className="w-[375px] mx-auto bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen flex flex-col">
        {/* HEADER */}
        <div className="fixed top-0 z-10">
          <header className="w-full flex flex-col items-center pb-[24px] min-h-[72px]">
            <div className="w-[375px] h-[72px] bg-white shadow flex items-center gap-10 px-6 py-6">
              <div className="flex items-center select-none">
                <svg
                  onClick={handleBackToList}
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
              <h2 className="text-lg font-bold">جزئیات سفارش</h2>
            </div>
          </header>
        </div>

        {/* محتوا */}
        <div className="flex-1 mt-[90px] px-4 pb-20">
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">شماره سفارش:</span>
              <span className="font-bold">#{selectedOrder.id}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">تاریخ:</span>
              <span>{formatDate(selectedOrder.date)}</span>
            </div>
            <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">تعداد محصولات:</span>
                  <span>{selectedOrder.itemCount} عدد</span>
                </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
              <span className="text-sm text-gray-500">مبلغ کل:</span>
              <span className="font-bold text-green-600">
                {selectedOrder.totalPrice.toLocaleString()} تومان
              </span>
            </div>
            <div
                  className="flex justify-center items-center mt-2 pt-2 "
                  onClick={handleBackToList}
                >
                  <button className="bg-red-500 p-1 text-[13px] text-white rounded-xl cursor-pointer">
                    بستن
                  </button>
                </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-2">
            محصولات سفارش داده شده:
          </h3>
          <div className="space-y-3">
            {selectedOrder.items.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-3 flex items-center gap-3"
              >
                <div className="relative w-16 h-16 rounded overflow-hidden">
                  <Image
                    src={`/images/products/${item.imageUrl}.png`}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {item.originalPrice.toLocaleString()} تومان
                  </p>
                  <p className="text-xs text-gray-400">
                    تعداد: {item.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 text-center">
                    مجموع:
                  </p>
                  <p className="text-sm font-bold text-gray-800 text-left">
                    {(item.originalPrice * item.quantity).toLocaleString()}{" "}
                    تومان
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    );
  }

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
            <p className="mt-4 text-lg font-semibold">
              هیچ سفارشی ثبت نشده است
            </p>
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
                className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">شماره سفارش:</span>
                  <span className="font-bold">#{order.id}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">تاریخ:</span>
                  <span>{formatDate(order.date)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">تعداد محصولات:</span>
                  <span>{order.itemCount} عدد</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-500">مبلغ کل:</span>
                  <span className="font-bold text-green-600">
                    {order.totalPrice.toLocaleString()} تومان
                  </span>
                </div>
                <div
                  className="flex justify-center items-center mt-2 pt-2 "
                  onClick={() => handleOrderClick(order)}
                >
                  <button className="bg-blue-500 p-1 text-[13px] text-white rounded-xl cursor-pointer">
                    جزییات
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
