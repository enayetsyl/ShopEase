"use client";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomInput from "@/components/shared/CustomInput";
import { H2, Paragraph, H6 } from "@/components/shared/CustomTypography";
import Image from "next/image";
import React from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaArrowRightLong, FaRegEnvelope } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { CgRename } from "react-icons/cg";
import Link from "next/link";
import CustomButton from "@/components/shared/CustomButton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <CustomInput
                  icon={<CgRename />}
                  placeholder="Name"
                  inputClassName="bg-white py-8 focus-visible:ring-0"
                  {...register("name")}
                  error={errors.name?.message as string | undefined}
                />

                <CustomInput
                  icon={<FaRegEnvelope />}
                  placeholder="Email Address"
                  type="email"
                  inputClassName="bg-white py-8 focus-visible:ring-0"
                  {...register("email")}
                  error={errors.email?.message as string | undefined}
                />

                <CustomInput
                  icon={<IoKeyOutline />}
                  placeholder="Password"
                  type="password"
                  inputClassName="bg-white py-8 focus-visible:ring-0"
                  {...register("password")}
                  error={errors.password?.message as string | undefined}
                />

                <div className="flex justify-start items-center gap-5">
                  <H6 className="font-semibold text-black">Account Type</H6>
                  <RadioGroup className="flex justify-center items-center gap-5">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="CUSTOMER"
                        id="customer"
                        {...register("role")}
                      />
                      <label
                        htmlFor="customer"
                        className="text-sm font-medium text-gray-700"
                      >
                        Customer
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="VENDOR"
                        id="vendor"
                        {...register("role")}
                      />
                      <label
                        htmlFor="vendor"
                        className="text-sm font-medium text-gray-700"
                      >
                        Vendor
                      </label>
                    </div>
                  </RadioGroup>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}

                <Link href="/sign-in">
                  <Paragraph className="underline font-normal py-5 text-black hover:text-primary">
                    Already Have Account?
                  </Paragraph>
                </Link>

                <CustomButton
                  className="bg-gradient-to-r from-primary to-secondary dark:from-secondary py-8 dark:to-primary w-full rounded-md shadow-md text-foreground hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black gap-2 text-lg"
                  icon={<FaArrowRightLong />}
                  iconPosition="right"
                  type="submit"
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
