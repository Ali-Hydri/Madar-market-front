// components/CategoryList.tsx

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCategories } from "@/lib/api";
import CategoryItem from "@/types/categoriesType";

interface Props {
  selectedCategoryId?: string; // دسته انتخاب‌شده
}

const CategoryList: React.FC<Props> = ({ selectedCategoryId }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: CategoryItem) => {
    router.push(`/category/${category.id}`);
  };

  return (
    <div className="">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`flex-shrink-0 text-[#787471]  text-[12px] px-2 py-1 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap flex items-center flex-col w-20 ${
              selectedCategoryId === category.id.toString()
                ? "border border-orange-500 shadow bg-orange-50 "
                : "text-[text-[#787471]] hover:bg-gray-200"
            }`}
          >
            <div className="bg-gradient-to-br mb-2 from-[#FFF7F5] to-[#FFEBE5] rounded-lg w-16 h-16 relative">
              <Image
                src={`/images/categories/${category.imageUrl}.png`}
                alt={category.name}
                fill
                className="object-contain"
              />
            </div>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
