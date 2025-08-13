import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex gap-10 justify-center pt-100 w-[375px] mx-auto">
      <Link href="/panel" className="bg-green-400 p-3 rounded-xl cursor-pointer hover:opacity-80 h-[50px]">پنل ادمین</Link>
      <Link href="/home" className="bg-orange-400 p-3 rounded-xl cursor-pointer hover:opacity-80 h-[50px]">فروشگاه</Link>
    </div>
  );
}

export default page;
