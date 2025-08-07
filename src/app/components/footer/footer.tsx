import React, { useState } from "react";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { RiHome3Line } from "react-icons/ri";
import { CiReceipt } from "react-icons/ci";




function Footer() {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="border-t-[1px] border-[#F5F2EF] fixed bottom-0 mx-auto w-[375px] bg-white z-50">
      <div className="flex gap-[42px] justify-center items-center py-[14px]">
        <div
          className="relative flex flex-col justify-center items-center cursor-pointer"
          onClick={() => handleTabClick("home")}
        >
          {selectedTab === "home" && (
            <div className="bg-[#FF6A29] h-[4px] w-[34px] rounded-b-2xl absolute -top-[14px]"></div>
          )}
          <p
            className={`text-[12px] pt-[6px] flex flex-col justify-center items-center ${
              selectedTab === "home" ? "text-[#FF6A29]" : "text-[#B3B2B2]"
            }`}
          >
            <RiHome3Line  className="w-[20px] h-[20px]"/>
            خانه
          </p>
        </div>
        <div
          className="relative flex flex-col justify-center items-center cursor-pointer"
          onClick={() => handleTabClick("cart")}
        >
          {selectedTab === "cart" && (
            <div className="bg-[#FF6A29] h-[4px] w-[34px] rounded-b-2xl absolute -top-[14px]"></div>
          )}
          <p
            className={`text-[12px] pt-[6px] flex flex-col justify-center items-center ${
              selectedTab === "cart" ? "text-[#FF6A29]" : "text-[#B3B2B2]"
            }`}
          >
            <RiShoppingBasket2Line  className="w-[20px] h-[20px]"/>
            سبد خرید
          </p>
        </div>
        <div
          className="relative flex flex-col justify-center items-center cursor-pointer"
          onClick={() => handleTabClick("orders")}
        >
          {selectedTab === "orders" && (
            <div className="bg-[#FF6A29] h-[4px] w-[34px] rounded-b-2xl absolute -top-[14px]"></div>
          )}

          <p
            className={`text-[12px] pt-[6px] flex flex-col justify-center items-center ${
              selectedTab === "orders" ? "text-[#FF6A29]" : "text-[#B3B2B2]"
            }`}
          >
            <CiReceipt  className="w-[20px] h-[20px]"/>
            سفارش ها
          </p>
        </div>
        <div
          className="relative flex flex-col justify-center items-center cursor-pointer"
          onClick={() => handleTabClick("profile")}
        >
          {selectedTab === "profile" && (
            <div className="bg-[#FF6A29] h-[4px] w-[34px] rounded-b-2xl absolute -top-[14px]"></div>
          )}
          <p
            className={`text-[12px] pt-[6px] flex flex-col justify-center items-center ${
              selectedTab === "profile" ? "text-[#FF6A29]" : "text-[#B3B2B2]"
            }`}
          >
            <FaRegUser  className="w-[20px] h-[20px]"/>
            پروفایل
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
