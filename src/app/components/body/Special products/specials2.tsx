"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import images - using existing assets
import product1 from "@/assets/body/کشک.png";
import product2 from "@/assets/body/روغن زیتون.png";
import product3 from "@/assets/body/سبد.png";

interface SpecialProduct {
  id: number;
  name: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  image: StaticImageData;
  alt: string;
}

const SpecialProducts2: React.FC = () => {
  const specialProducts: SpecialProduct[] = [
    {
      id: 1,
      name: "روغن زیتون بکر کریستال ",
      originalPrice: "40,000",
      discountedPrice: "3,700,000",
      discount: "29%",
      image: product1,
      alt: "روغن زیتون بکر کریستال - 5 لیتر ",
    },
    {
      id: 2,
      name: "روغن مایع آفتابگردان",
      originalPrice: "85,000",
      discountedPrice: "68,000",
      discount: "20%",
      image: product3,
      alt: "روغن مایع آفتابگردان",
    },
    {
      id: 3,
      name: "هدفون بی‌سیم",
      originalPrice: "120,000",
      discountedPrice: "96,000",
      discount: "20%",
      image: product1,
      alt: "هدفون بی‌سیم",
    },
    {
      id: 4,
      name: "هدفون بی‌سیم",
      originalPrice: "120,000",
      discountedPrice: "96,000",
      discount: "20%",
      image: product3,
      alt: "هدفون بی‌سیم",
    },
  ];

  return (
    <div className="w-full pt-6 pb-[24px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-3">
        <h2 className="text-[16px] font-bold text-[#BA400B]">محصولات ویژه</h2>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#BA400B]">
            بهترین پیشنهادات روز
          </span>
        </div>
      </div>

      {/* Products Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={60}
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
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
        }}
        className="special-products-swiper"
      >
        {specialProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div>
              <div className="mb-[1px] border-[1px] border-[#F5F2EF] bg-white w-[155px] rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group">
                {/* Discount Badge */}
                <div className="relative">
                  {/* Product Image */}
                  <div className="w-full h-48 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-32 h-32 relative">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        className="object-contain"
                        sizes="128px"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className=" text-[12px] font-medium text-gray-800 line-clamp-2 px-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className=" items-center gap-2 px-2">
                    <div className="flex space-x-[4px]">
                      <span className="text-[10px] text-gray-400 line-through">
                        {product.originalPrice} تومان
                      </span>
                      <div className="w-[23px] h-[16px] bg-[#C50F1F] pt-[1px] pr-[2px] text-white text-[9px] font-bold rounded-full z-10">
                        {product.discount}
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[14px] font-bold text-[#BA400B]">
                      {product.discountedPrice}{" "}
                      <p className="text-[10px]">تومان</p>
                    </span>
                    <div className="flex"></div>
                  </div>

                  {/* Add to Cart Button */}
                  <button className=" w-full bg-[#F7F7F7] text-[#787471] border-[1px] border-[#F5F2EF] text-sm font-medium py-2 rounded-[20px] hover:bg-gray-200 transition-colors duration-300 mt-3 cursor-pointer">
                    افزودن به سبد خرید
                  </button>
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
    </div>
  );
};

export default SpecialProducts2;
