"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import HeaderLogo from "@/assets/head/Header Logo.png";
import { LuSearch } from "react-icons/lu";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { getProductsByCategory } from "@/lib/api";
import Product from "@/types/productsType";
import CategoryList from "@/components/body/Product categories/categoriesInProduct";
import ProductModal from "../../../components/product/productModal";
import ProductCard from "../../../components/product/productCard";
import CartModal from "@/components/CartModal/cartModal";
import { useCart } from "@/context/cartContext";
import Footer from "@/components/footer/footer";

interface SubCategory {
  id: number;
  
  name: string;
}

const CategoryPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const categoryId = Number(params?.id);
  const { cartItems } = useCart();

  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("best-selling");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Sub-categories based on main category
  const subCategories: SubCategory[] = [
    { id: 1, name: "بستنی" },
    { id: 2, name: "کشک" },
    { id: 3, name: "کره" },
    { id: 4, name: "خامه" },
    { id: 5, name: "پنیر" },
    { id: 6, name: "دوغ" },
    { id: 7, name: "ماست" },
  ];

  const [sampleProducts, setSampleProducts] = useState<Product[]>();

  const handleSubCategoryClick = (subCategoryId: number) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleBackClick = () => {
    router.push("/home");
  };

  const handleSortChange = (sortValue: string) => {
    setSortBy(sortValue);
    setIsSortDropdownOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) return;

      try {
        const res = await getProductsByCategory(categoryId);
        setSampleProducts(res);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const selectedCategoryId = params.id;
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen w-[375px] mx-auto">
      <header className="w-full flex flex-col items-center pb-[24px] min-h-[72px]">
        {/* Main header box */}
        <div className="w-[375px] h-[72px] bg-white shadow flex items-center justify-between px-6 py-6">
          {/* Logo and Text */}
          <button
            className="flex items-center select-none"
            onClick={handleBackClick}
          >
            {/* Arrow Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 cursor-pointer"
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
              />
            </div>
          </button>
          {/* Basket Icon */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#C50F1F] cursor-pointer rounded-[10px] flex justify-between w-[127px] h-[40px]"
            >
              <div className="p-[6px]">
                <p className="text-white text-[12px] pt-[px] font-bold">
                  مشاهده سبد
                </p>
                <p className="text-[10px] text-white">
                  {cartItems.length} محصول
                </p>
              </div>
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px] border bg-white border-[#C50F1F]">
                {/* Basket SVG */}
                <RiShoppingBasket2Line className="text-[#C0C0C0]" />
              </div>
            </button>
            <CartModal
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />

            <button className="cursor-pointer flex items-center justify-center w-[40px] h-[40px] rounded-[10px] border border-[#C0C0C0]">
              {/* Basket SVG */}
              <LuSearch className="text-[#C0C0C0]" />
            </button>
          </div>
        </div>
      </header>

      {/* Categories Row */}
      <div className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <CategoryList selectedCategoryId={selectedCategoryId as string} />
        </div>
      </div>

      <div className="pb-4 px-4">
        {/* Sub-categories Tabs */}
        <div className="mb-6">
          <div className=" flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {subCategories.map((subCategory) => (
              <button
                key={subCategory.id}
                onClick={() => handleSubCategoryClick(subCategory.id)}
                className={`text-[#787471] flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedSubCategory === subCategory.id
                    ? "border-[1px] border-[#FF6A29] text-[#FF6A29]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {subCategory.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting and Filtering */}
        <div className="flex justify-between items-center mb-6">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-[13px] flex items-center justify-between w-[123px] h-[33px]"
            >
              <span className="text-right">
                {sortBy === "best-selling" && "پر فروش ترین"}
                {sortBy === "most-discounted" && "بیشترین تخفیف"}
                {sortBy === "newest" && "جدیدترین"}
                {sortBy === "cheapest" && "ارزان ترین"}
                {sortBy === "most-expensive" && "گران ترین"}
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200  ${
                  isSortDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isSortDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => handleSortChange("best-selling")}
                    className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === "best-selling"
                        ? "bg-orange-50 text-[#FF6A29]"
                        : "text-gray-700"
                    }`}
                  >
                    پر فروش ترین
                  </button>
                  <button
                    onClick={() => handleSortChange("most-discounted")}
                    className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === "most-discounted"
                        ? "bg-orange-50 text-[#FF6A29]"
                        : "text-gray-700"
                    }`}
                  >
                    بیشترین تخفیف
                  </button>
                  <button
                    onClick={() => handleSortChange("newest")}
                    className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === "newest"
                        ? "bg-orange-50 text-[#FF6A29]"
                        : "text-gray-700"
                    }`}
                  >
                    جدیدترین
                  </button>
                  <button
                    onClick={() => handleSortChange("cheapest")}
                    className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === "cheapest"
                        ? "bg-orange-50 text-[#FF6A29]"
                        : "text-gray-700"
                    }`}
                  >
                    ارزان ترین
                  </button>
                  <button
                    onClick={() => handleSortChange("most-expensive")}
                    className={`w-full text-right px-3 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === "most-expensive"
                        ? "bg-orange-50 text-[#FF6A29]"
                        : "text-gray-700"
                    }`}
                  >
                    گران ترین
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button className="bg-[#F7F7F7] border border-none rounded-[8px] px-3 py-2 text-[12px] text-[#787471] flex items-center gap-2 w-[101px] h-[33px] hover:bg-gray-200 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span>تخفیفات</span>
            </button>
            <button className="bg-[#F7F7F7] border border-none rounded-[8px] px-3 py-2 text-[12px] text-[#787471] flex items-center gap-2 w-[101px] h-[33px] hover:bg-gray-200 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>حامی کارت</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-4">
          {sampleProducts && sampleProducts.length === 0 ? (
            <p className="text-center text-gray-500 text-sm mt-10">
              محصولی یافت نشد.
            </p>
          ) : (
            sampleProducts &&
            sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))
          )}
        </div>
        {/* Load More */}
        <div className="flex justify-center mt-8">
          {sampleProducts && sampleProducts.length === 0 ? (
            <div></div>
          ) : (
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <Footer />
    </div>
  );
};

export default CategoryPage;
