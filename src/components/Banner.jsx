"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      image: "https://i.ibb.co.com/mrfC2S3T/a2.jpg",
      titleStart: "Turn Your Startup",
      titleEnd: "Idea Into Reality",
      description: "Share unique business ideas, connect with creative people, and grow your vision with community support.",
      button:"Explore Ideas",
       path: "/ideas"
    },
    {
      image: "https://i.ibb.co.com/mrfC2S3T/a2.jpg",
      titleStart: "Validate Ideas With",
      titleEnd: "The Tech Community",
      description: "Get critical community feedback, collaborate with fellow builders, and refine your concepts collectively.",
      button:"Get Started",
       path: "/"
    },
    {
      image: "https://i.ibb.co.com/mrfC2S3T/a2.jpg",
      titleStart: "Discover Massive",
      titleEnd: "Trending Concepts",
      description: "Explore market gaps, find tech co-founders, or get inspired by high-potential solutions across AI and FinTech.",
      button:"Share Your Idea",
      path: "/add-idea"
    },
  ];

  return (
    <section  className="w-full my-6 rounded-2xl overflow-hidden bg-[#020617] border border-gray-800 relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-96 md:h-[420px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className="w-full h-full flex flex-col md:flex-row items-center">

              <div className="w-full md:w-[45%] h-full flex flex-col justify-center px-8 md:px-12 py-8 text-white bg-[#020617] z-10">
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-3">
                  {slide.titleStart}{" "}
                  <span className="text-blue-500 font-black block md:inline">
                    {slide.titleEnd}
                  </span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm font-normal mb-6 leading-relaxed max-w-sm">
                  {slide.description}
                </p>

                <div>
                  <Link href={slide.path}>
                  <Button variant="solid" size="md" className={"font-bold px-6 rounded-lg bg-blue-600 hover:bg-blue-700"}>
                    {slide.button} 
                  </Button></Link>
                </div>
              </div>

              {/* ২. ডান পাশ: ইমেজ সেকশন (স্ক্রিনশটের মতো স্টাইলিশ কার্ভ/শেপ সহ) */}
              <div className="w-full md:w-[55%] h-48 md:h-full relative overflow-hidden md:[clip-path:polygon(12%_0%,100%_0%,100%_100%,0%_100%)]">
                <Image
                  src={slide.image}
                  alt="Startup Banner"
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
                {/* হালকা ওভারলে যাতে ইমেজের টোন ডার্ক থিমের সাথে মিলে যায় */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/40 to-transparent pointer-events-none" />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
