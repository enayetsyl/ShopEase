"use client";
import ReusableButton from "@/components/shared/ReuseableButton";
import { useLoginMutation } from "@/redux/api/authApi";
import Image from "next/image";

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
      <ReusableButton
        loading={false}
        variant="default"
        className="bg-primary text-primary-foreground hover:bg-primary/60 dark:bg-secondary dark:text-secondary-foreground"
      >
        Hello
      </ReusableButton>
      {data && <p>Welcome, {data.name}!</p>}
    </div>
  );
}
