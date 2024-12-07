"use client";
import HomeCarousel from "@/components/home/Carousel";
import Category from "@/components/home/Category";

export default function Home() {
  return (
    <div className="px-5 pb-20">
      <HomeCarousel />
      <Category />
    </div>
  );
}
