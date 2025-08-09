"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SpecialProducts2 from "./specials2";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  description: string;
  ingredients?: string;
  packaging?: string;
  weight?: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

// Product Modal Component
const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors z-10"
        >
          ×
        </button>

        {/* Product Image */}
        <div className="relative h-64 bg-gray-50 rounded-t-2xl flex items-center justify-center">
          <div className="w-48 h-48 relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="192px"
            />
          </div>
          {/* Image Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-right">
            {product.name}
          </h2>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-1">مواد تشکیل دهنده:</p>
              <p className="text-sm font-medium text-gray-800">
                {product.ingredients || "شیر گاوی"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-1">نوع بسته بندی:</p>
              <p className="text-sm font-medium text-gray-800">
                {product.packaging || "پلی اتیلن"}
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-600 font-medium">
                قیمت با حامی کارت
              </span>
              <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                {product.discountedPrice.toLocaleString()} تومان
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">قیمت کالا</span>
              <span className="text-base text-gray-800">
                {product.originalPrice.toLocaleString()} تومان
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
};

const SpecialProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [specialProducts, setSpecialProducts] = useState<Product[]>([]);
  const BASE_URL = "http://localhost:3005";

  useEffect(() => {
    const fetchSpecials = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/special`);
        if (!res.ok) throw new Error("خطا در دریافت محصولات ویژه");
        const data = await res.json();
        setSpecialProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSpecials();
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
    <div className="w-[327px] mx-auto pt-6 ">
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
                    <div className="flex"></div>
                  </div>

                  {/* Add to Cart Button */}
                  {getQuantityInCart(product.id) === 0 ? (
                    <button
                      className="w-full bg-[#F7F7F7] text-[#787471] border-[1px] border-[#F5F2EF] text-sm font-medium py-2 rounded-[20px] hover:bg-gray-200 transition-colors duration-300 mt-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({ ...product, quantity: 1 });
                      }}
                    >
                      افزودن به سبد خرید
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-[#F7F7F7] border border-[#F5F2EF] rounded-[20px] mt-3">
                      <button
                        onClick={() => incrementQuantity(product.id)}
                        className=" px-2 text-[22px] text-orange-500 cursor-pointer"
                      >
                        +
                      </button>
                      <span className="px-2">
                        {getQuantityInCart(product.id)}
                      </span>
                      <button
                  onClick={() => decrementQuantity(product.id)}
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
      <SpecialProducts2 />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default SpecialProducts;
