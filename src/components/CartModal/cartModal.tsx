"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center ">
      <div className="bg-gray-100 w-[375px] h-[98vh] rounded-t-2xl overflow-y-auto p-4 border-t-[1px] border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">سبد خرید</h2>
          <button
            onClick={onClose}
            className="text-sm text-red-500 cursor-pointer hover:bg-gray-100 w-10 h-10 hover:rounded-xl"
          >
            بستن
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">سبد خرید خالی است.</p>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-y-[1px] border-gray-200">
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
      </div>
    </div>
  );
};

export default CartModal;
