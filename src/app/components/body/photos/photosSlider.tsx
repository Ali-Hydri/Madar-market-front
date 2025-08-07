"use client";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

import coffee from "@/assets/body/coffee-products.jpg";
import hyper from "@/assets/body/nody-عکس-هایپر-مارکت-1740601926.png";
import products from "@/assets/body/products.webp";

const SwiperGallery: FC = () => {
  const images = [
    { src: coffee, alt: "coffee" },
    { src: hyper, alt: "hyper" },
    { src: products, alt: "products" },
  ];

  return (
    <div className="w-full select-none flex justify-center">
      <Swiper
        navigation
        loop={true}
        centeredSlides={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          0: {
            slidesPerView: 1,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 1,
            centeredSlides: true,
          },
        }}
        modules={[Navigation]}
        className="my-swiper w-[327px] h-[160px] swiper-custom   "
      >
        {images.map((img, idx) => (
          <SwiperSlide key={`${img.alt}-${idx}`}>
            <Image
              src={img.src}
              alt={img.alt}
              className="rounded-lg md:h-full md:w-full object-cover transition-all duration-300 w-[320px] h-[160px] justify-center mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-custom .swiper-slide {
          opacity: 0.5 !important;
          transform: scale(0.85);
          transition: all 0.3s ease;
        }

        .my-slider .swiper-slide {
          opacity: 1 !important;
          transform: scale(0.85);
          transition: all 0.3s ease;
          z-index: 1;
        }
        .my-slider .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1);
          z-index: 10;
        }

        .swiper-custom .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1);
        }

        @media (max-width: 767px) {
          .swiper-custom .swiper-slide {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SwiperGallery;
