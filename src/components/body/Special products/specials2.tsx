"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ProductModal from "@/components/product/productModal";
import { Product } from "@/types/types";

const SpecialProducts2: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialProductsLine2, setSpecialProductsLine2] = useState<Product[]>(
    []
  );
  const BASE_URL = "http://localhost:3005";

  useEffect(() => {
    const fetchSpecialsLine2 = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/specialLine2`);
        if (!res.ok) throw new Error("خطا در دریافت محصولات ویژه");
        const data = await res.json();
        // Filter products with isSpecialLine2 property
        const filteredProducts = data.filter(
          (product: Product) => product.isSpecialLine2
        );
        setSpecialProductsLine2(filteredProducts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpecialsLine2();
  }, []);

  const { addToCart, cartItems, incrementQuantity, decrementQuantity } =
    useCart();

  const getQuantityInCart = (productId: number) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };
  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-[327px] mx-auto py-6 ">
      {/* Products Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={2.3}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2.3,
            spaceBetween: 50,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 2.3,
            spaceBetween: 50,
          },
        }}
        className="special-products-swiper"
      >
        {specialProductsLine2.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              onClick={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
            >
              <div className="mb-[1px] border-[1px] border-[#F5F2EF] bg-white w-[155px] rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group">
                {/* Discount Badge */}
                <div className="relative">
                  {/* Product Image */}
                  <div className="w-full h-48 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-32 h-32 relative">
                      <Image
                        src={`/images/products/${product.imageUrl}.png`}
                        alt={product.name}
                        fill
                        className="object-contain rounded-t-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2 ">
                  <h3 className="text-sm font-medium text-[#4F4C4B] line-clamp-2 px-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className=" items-center gap-2 px-2">
                    <div className="flex space-x-[4px]">
                      <span className="text-[10px] text-gray-400 line-through">
                        {product.originalPrice.toLocaleString()} تومان
                      </span>
                      <div className="w-[23px] h-[16px] bg-[#C50F1F] pt-[1px] pr-[2px] text-white text-[9px] font-bold rounded-full z-10">
                        {product.discountPercentage}%
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[14px] font-bold text-[#BA400B]">
                      {product.discountedPrice.toLocaleString()}{" "}
                      <p className="text-[10px]">تومان</p>
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  {getQuantityInCart(product.id) === 0 ? (
                    <button
                      className="w-full bg-[#F7F7F7] text-[#787471] border-[1px] border-[#F5F2EF] text-sm font-medium py-2 rounded-[20px] hover:bg-gray-200 transition-colors duration-300 mt-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // جلوگیری از باز شدن مودال وقتی رو دکمه کلیک میشه
                        addToCart({ ...product, quantity: 1 });
                      }}
                    >
                      افزودن به سبد خرید
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-[#F7F7F7] border border-[#F5F2EF] rounded-[20px] mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          incrementQuantity(product.id);
                        }}
                        className=" px-2 text-[22px] text-orange-500 cursor-pointer"
                      >
                        +
                      </button>
                      <span className="px-2">
                        {getQuantityInCart(product.id)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          decrementQuantity(product.id);
                        }}
                        className="text-orange-500 px-2 text-[18px] cursor-pointer"
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles */}
      <style jsx global>{`
        .special-products-swiper {
          padding: 0 4px;
        }

        .special-products-swiper .swiper-slide {
          height: auto;
        }

        .swiper-pagination {
          position: static;
          width: auto;
        }

        .swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 4px;
        }

        .swiper-pagination .swiper-pagination-bullet-active {
          background: #ba400b;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default SpecialProducts2;
