"use client";
import HomeCarousel from "@/components/home/Carousel";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomButton from "@/components/shared/CustomButton";
import CustomInput from "@/components/shared/CustomInput";
import { useLoginMutation } from "@/redux/api/authApi";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Home() {
  const [login, { isLoading, data, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const response = await login({
        email: "jhondoe4@example.com",
        password: "securepassword123",
      }).unwrap();
      console.log("Login successful:", response);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="px-5">
      <HomeCarousel />
    </div>
  );
}
