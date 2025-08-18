import { useState } from "react";

export default function SearchBox({ onSearch }: { onSearch: (value: string) => void }) {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full">
      <div className="mt-[8px] w-[327px] h-[40px] flex items-center bg-white rounded-2xl border border-gray-200 px-6 mx-6 py-4 shadow-sm">
        {/* Search Icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="13" cy="13" r="8" stroke="#D1D5DB" strokeWidth="2" />
          <path
            d="M21 21l-3.5-3.5"
            stroke="#D1D5DB"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="text"
          placeholder="جستجو"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          className="flex-1 bg-transparent outline-none text-lg text-gray-500 placeholder-gray-300 text-right pr-2 "
          dir="rtl"
        />
      </div>
    </div>
  );
}
