"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import HeaderLogo from "@/assets/head/Header Logo.png";
import { RiShoppingBasket2Line } from "react-icons/ri";
import CartModal from "../CartModal/cartModal";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SearchBox from "../searchBox/searchBox";
import { Product } from "@/types/types";
import { fetchProduct } from "@/services/userService";
import ProductModal from "../product/productModal";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const products = await fetchProduct();
      const filteredProducts = products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredProducts);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching products:", error);
      setSearchResults([]);
      setShowResults(false);
    }
  };

  return (
    <header className="w-full flex flex-col items-center pb-[24px] min-h-[72px]">
      {/* Main header box */}
      <div className="w-[375px] h-[72px] bg-white shadow flex items-center justify-between px-6 py-6">
        {/* Logo and Text */}
        <div className="flex items-center select-none">
          {/* Arrow Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
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
            <Image src={HeaderLogo} alt="لوگو" className="h-[30px] w-[60px]" />{" "}
          </div>
        </div>
        {/* Basket Icon */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px] border border-gray-300 cursor-pointer"
          >
            {/* Basket SVG */}
            <FaRegUser className="text-[#C0C0C0]" />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px] border border-gray-300 cursor-pointer"
          >
            {/* Basket SVG */}
            <RiShoppingBasket2Line className="text-[#C0C0C0]" />
          </button>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Box */}
      <div ref={searchBoxRef} className="relative mt-4 mx-auto">
        <SearchBox onSearch={handleSearch} />
        {showResults && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-2xl border border-gray-200 shadow-lg max-h-60 overflow-y-auto">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.discountedPrice} تومان
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                محصولی یافت نشد
              </div>
            )}
          </div>
        )}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
