"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import Footer from "@/components/footer/footer";
import HeaderLogo from "@/assets/head/Header Logo.png";
import { useRouter } from "next/navigation";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModalPage: React.FC<CartModalProps> = () => {
  const { cartItems, removeFromCart, setCartItems } = useCart();
  const router = useRouter();

  return (
    <div className="w-[375px] mx-auto bg-gray-100 h-screen flex flex-col ">
      {/* HEADER */}
      <div className="fixed top-0 z-10">
        <header className="w-full flex flex-col items-center justify-center pb-[24px] min-h-[72px]">
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
            <h2 className="text-lg font-bold">سبد خرید</h2>
          </div>
        </header>
      </div>

      <div className="p-4 pt-22 ">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <p className="text-center text-gray-500 mt-10">
            سبد خرید خالی است.
          </p>
          <button
            onClick={() => router.push("/home")}
            className="mt-6 px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all cursor-pointer"
          >
            رفتن به فروشگاه
          </button>
        </div>        ) : (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-y-[1px] border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded overflow-hidden">
                    <Image
                      src={`/images/products/${item.imageUrl}.png`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-600">
                      {item.originalPrice} تومان
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs cursor-pointer hover:bg-gray-100 w-10 h-10 hover:rounded-xl"
                  >
                    حذف
                  </button>
                  <span className="text-[10px] flex gap-[3px]">
                    {item.quantity} <p>عدد</p>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => {
            // گرفتن سفارشات قبلی از لوکال استوریج
            const previousOrders = JSON.parse(
              localStorage.getItem("orders") || "[]"
            );

            // اضافه کردن سفارشات فعلی به قبلی‌ها
            const updatedOrders = [...previousOrders, ...cartItems];

            // ذخیره دوباره همه سفارشات
            localStorage.setItem("orders", JSON.stringify(updatedOrders));

            // پاک کردن سبد خرید
            localStorage.removeItem("cart");
            setCartItems([]);
          }}
          disabled={cartItems.length === 0}
          className={`w-full mt-2 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2
    ${
      cartItems.length === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-green-400 hover:bg-green-500 text-gray-700 cursor-pointer "
    }`}
        >
          ثبت سفارش
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default CartModalPage;
