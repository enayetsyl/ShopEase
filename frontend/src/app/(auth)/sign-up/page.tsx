import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import Image from "next/image";
import React from "react";
import { IoBriefcaseOutline } from "react-icons/io5";

const SignUp = () => {
  return (
    <div>
      <CustomBreadcrumb
        items={[{ label: "Home", path: "/" }, { label: "Sign Up" }]}
        title="Sign Up"
      />
      <div className="flex justify-center items-center py-20">
        <div className="max-w-4xl bg-gray-400 rounded-2xl w-full">
          <Image
            src="/images/sign-up.jpg"
            alt="Signup"
            height={200}
            width={300}
            className="object-cover rounded-t-2xl w-full max-h-52"
          />
          <div className="p-10">
            <div className="flex w-full justify-start items-start">
              <div className="bg-white rounded-lg p-3">
                <IoBriefcaseOutline className="text-4xl text-primary font-bold" />
                <div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
