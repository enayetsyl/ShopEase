import SignUpForm from "@/components/forms/signUpForm";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { H2, Paragraph } from "@/components/shared/CustomTypography";
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
        <div className="max-w-3xl bg-gray-100 rounded-2xl w-full">
          <Image
            src="/images/sign-up.jpg"
            alt="Signup"
            height={200}
            width={300}
            className="object-cover rounded-t-2xl w-full max-h-52"
          />
          <div className="px-16 pb-16">
            <div className="w-full pt-16">
              <div className="flex justify-start items-start gap-5">
                <div className="bg-white p-3 rounded-lg">
                  <IoBriefcaseOutline className="text-3xl text-primary font-bold" />
                </div>
                <div>
                  <H2 className="font-bold">Sign Up</H2>
                  <Paragraph className="text-xs lg:text-lg pt-5 text-black">
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account.
                  </Paragraph>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
