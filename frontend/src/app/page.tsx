"use client";
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
    <div>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <CustomButton
        loading={false}
        variant="outline"
        className=" text-primary-foreground hover:bg-primary/60 dark:bg-secondary dark:text-secondary-foreground"
      >
        Hello
      </CustomButton>
      <div className="w-96 flex flex-col justify-center items-center space-y-4">
        <CustomInput
          placeholder="Search products..."
          icon={<AiOutlineLoading3Quarters />}
          iconClassName="text-blue-500"
          inputClassName="border border-gray-300 rounded-lg"
        />
        <CustomInput
          placeholder="Enter email address"
          inputClassName="bg-gray-100 focus:ring focus:ring-blue-300"
          labelClassName="text-gray-600"
        />
        <CustomInput
          label="First Name"
          isRequired
          labelClassName="text-lg font-bold text-red-500"
          inputClassName="border-2 border-red-300 rounded-md"
        />
        <CustomInput
          label="Username / Email Address"
          labelClassName="text-gray-700"
          inputClassName="border-gray-400 rounded"
        />
      </div>

      {data && <p>Welcome, {data.name}!</p>}
    </div>
  );
}
