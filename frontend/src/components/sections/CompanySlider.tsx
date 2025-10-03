"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

export default function CompanySlider() {
  return (
    <section className="stp-15 sbp-15 container grid grid-cols-12 gap-6 border-b border-strokeColor">
      <div className="col-span-12 sm:col-span-6 xl:col-span-4">
        <p className="text-xl lg:text-2xl text-bodyText relative after:absolute after:top-[55%] after:right-0 after:w-[50px] after:h-[2px] after:bg-bodyText max-xxl:after:content-none">
          <span className="font-bold text-mainTextColor">15,000+</span>
          businesses from small startups to household names
        </p>
      </div>
      <div className="col-span-12 sm:col-span-6 xl:col-span-8 flex pt-4">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className="sponsors"
        >
          <SwiperSlide>
            <Link href="/" className="flex justify-center items-center">
              <Image
                src="/images/logo1.png"
                alt="image"
                width={120}
                height={60}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/" className="flex justify-center items-center">
              <Image
                src="/images/logo2.png"
                alt="image"
                width={120}
                height={60}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/" className="flex justify-center items-center">
              <Image
                src="/images/logo3.png"
                alt="image"
                width={120}
                height={60}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/" className="flex justify-center items-center">
              <Image
                src="/images/logo2.png"
                alt="image"
                width={120}
                height={60}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/" className="flex justify-center items-center">
              <Image
                src="/images/logo3.png"
                alt="image"
                width={120}
                height={60}
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/" className="flex justify-center items-center">
              <Image
                src="/images/logo1.png"
                alt="image"
                width={120}
                height={60}
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
