import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomInput from "@/components/shared/CustomInput";
import {
  H1,
  H2,
  H3,
  H5,
  H6,
  H4,
  Paragraph,
} from "@/components/shared/CustomTypography";
import Image from "next/image";
import React from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaArrowRightLong, FaRegEnvelope } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { CgRename } from "react-icons/cg";
import Link from "next/link";
import CustomButton from "@/components/shared/CustomButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
          <div className="px-16 pb-16 ">
            {/* Text div */}
            <div className="w-full pt-16">
              <div className="flex justify-start items-start gap-5 ">
                <div className="bg-white p-3 rounded-lg ">
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
            {/* lower  div */}
            <div className="pt-8">
              <form action="" className="space-y-3">
                {/* Input field */}
                <CustomInput
                  icon={<CgRename />}
                  placeholder="Name"
                  inputClassName="bg-white py-8 focus-visible:ring-0 "
                />
                <CustomInput
                  icon={<FaRegEnvelope />}
                  placeholder="Email Address"
                  type="email"
                  inputClassName="bg-white py-8 focus-visible:ring-0 "
                />
                <CustomInput
                  icon={<IoKeyOutline />}
                  placeholder="Password"
                  type="password"
                  inputClassName="bg-white py-8 focus-visible:ring-0 "
                />
                {/* Radio button */}
                <div className=" flex justify-start items-center gap-5">
                  <H6 className="font-semibold text-black">Account Type</H6>
                  <RadioGroup className="flex justify-center items-center gap-5">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Customer" id="customer" />
                      <label
                        htmlFor="customer"
                        className="text-sm font-medium text-gray-700"
                      >
                        Customer
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Vendor" id="vendor" />
                      <label
                        htmlFor="vendor"
                        className="text-sm font-medium text-gray-700"
                      >
                        Vendor
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Already have account */}

                <Link href="/sign-in">
                  <Paragraph className="underline font-normal py-5 text-black hover:text-primary">
                    Already Have Account?
                  </Paragraph>
                </Link>

                {/* Button */}
                <CustomButton
                  className="bg-gradient-to-r from-primary to-secondary dark:from-secondary py-8 dark:to-primary w-full rounded-md shadow-md text-foreground hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black gap-2 text-lg"
                  icon={<FaArrowRightLong />}
                  iconPosition="right"
                >
                  Register Now
                </CustomButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
