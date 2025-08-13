"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { getCategories } from "@/lib/api";
import CategoryItem from "@/types/categoriesType";


const Categories: React.FC = () => {
  const router = useRouter();

  const handleCategoryClick = (category: CategoryItem) => {
    router.push(
      `/category/${category.id}`
    );
  };

  const [categories, setCategories] = useState<CategoryItem[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-[327px] mx-auto pt-[24px]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-[20px]">
        <h2 className="text-[16px] font-bold text-[#BA400B]">دسته بندی ها</h2>
        <h2 className="text-[12px] font-bold text-[#BA400B]">
          انتخاب سریع محصولات
        </h2>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-4">
        {categories &&
          categories.map((category: CategoryItem) => {
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center justify-center rounded-xl text-center hover:bg-red-50 hover:shadow-md transition-all duration-300 hover:border-red-200">
                  {/* Icon Container */}
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#FFF7F5] to-[#FFEBE5] m-2 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={`/images/categories/${category.imageUrl}.png`}
                        alt="دسته بندی ها"
                        fill
                        className="object-contain"
                        sizes="20px"
                      />
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-sm m-1 font-medium text-gray-700 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
                    {category.name}
                  </h3>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
