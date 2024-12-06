"use client";
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
      <CustomBreadcrumb
        items={[{ label: "Home", path: "/" }, { label: "Sign In" }]}
        title="Sign In"
      />

      {data && <p>Welcome, {data.name}!</p>}
    </div>
  );
}
