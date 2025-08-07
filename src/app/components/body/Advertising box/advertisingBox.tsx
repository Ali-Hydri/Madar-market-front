import React from "react";
import watch from "@/assets/body/ساعت مچی.png";
import Image from "next/image";

function AdvertisingBox() {
  return (
    <div className="w-full mx-auto flex justify-center items-center mb-[52px]">
      <div className="bg-gradient-to-r from-[#4AD3FF] to-[#D1F4FF] rounded-[12px] w-[327px] h-[69px]">
        <div className="flex gap-[78px]">
          <div className="justify-center items-center flex pr-[54px] text-[#01366A]">
            <p className="font-bold">ساعت مچی دیجیتال</p>
          </div>
          <div>
            <Image
              src={watch}
              alt="لوگو"
              className="h-[59px] w-[31px] ml-[108px] my-[5px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvertisingBox;
