"use client";
import { useRouter } from "next/navigation";
import React from "react";

function HomePage() {
  const router = useRouter();

  return (
    <div>
      <header className="bg-green-100 h-[100px] shadow-xl flex justify-between px-20 items-center">
        <div></div>
        <div>
          <button 
          onClick={() => router.push("/login")}
           className="bg-green-500 h-10 w-20 rounded-xl cursor-pointer">
            ورود
          </button>
        </div>
      </header>
    </div>
  );
}

export default HomePage;
