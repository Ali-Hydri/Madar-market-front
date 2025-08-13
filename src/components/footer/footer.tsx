import React, { useState } from "react";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { RiHome3Line } from "react-icons/ri";
import { CiReceipt } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";


function Footer() {
  const [selectedTab, setSelectedTab] = useState("home");
 const rout=  usePathname()
 
  // const handleTabClick = (tabName: string) => {
  //   setSelectedTab(tabName);
  // };

  
  const router = useRouter();

  return (
    <div className="border-t-[1px] border-[#F5F2EF] fixed bottom-0 mx-auto w-[375px] bg-white z-50">
      <div className="flex gap-[42px] justify-center items-center py-[14px]">
        <div
          className="relative flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setSelectedTab("home")}
        >
          {rout === "/home" && (
            <div className="bg-[#FF6A29] h-[4px] w-[34px] rounded-b-2xl absolute -top-[14px]"></div>
          )}
          <button
            className={`text-[12px] pt-[6px] flex flex-col justify-center items-center ${
              rout === "/home" ? "text-[#FF6A29]" : "text-[#B3B2B2]"
            }`}
            onClick={() => router.push(`/home`)}

          >
            <RiHome3Line className="w-[20px] h-[20px]" />
            خانه
          </button>
        </div>
        <div
          className="relative flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setSelectedTab("cart")}
        >
          {rout === "/shoppingCart" && (
            <div className="bg-[#FF6A29] h-[4px] w-[34px] rounded-b-2xl absolute -top-[14px]"></div>
          )}
          <button
            className={`text-[12px] pt-[6px] flex flex-col justify-center items-center ${
              rout === "/shoppingCart" ? "text-[#FF6A29]" : "text-[#B3B2B2]"
            }`}
            onClick={() => router.push(`/shoppingCart`)}

          >
            <RiShoppingBasket2Line className="w-[20px] h-[20px]" />
            سبد خرید
          </button>
        </div>
        <div
          className="relative flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setSelectedTab("orders")}
        >
          {rout === "/orders" && (
            <div className="bg-[#FF6A29] h-[4px] w-[34px] rounded-b-2xl absolute -top-[14px]"></div>
          )}

          <button
            className={`text-[12px] pt-[6px] flex flex-col justify-center items-center ${
              rout === "/orders" ? "text-[#FF6A29]" : "text-[#B3B2B2]"
            }`}
            onClick={() => router.push(`/orders`)}

          >
            <CiReceipt className="w-[20px] h-[20px]" />
            سفارش ها
          </button>
        </div>
        <div
          className="relative flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setSelectedTab("profile")}
        >
          {rout === "/profile" && (
            <div className="bg-[#FF6A29] h-[4px] w-[34px] rounded-b-2xl absolute -top-[14px]"></div>
          )}
          <button
            className={`text-[12px] pt-[6px] flex flex-col justify-center items-center ${
              rout === "/profile" ? "text-[#FF6A29]" : "text-[#B3B2B2]"
            }`}
            onClick={() => router.push(`/profile`)}
          >
            <FaRegUser className="w-[18px] h-[18px]" />
            پروفایل
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
