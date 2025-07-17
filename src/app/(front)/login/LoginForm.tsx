"use client";

import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/label/Label";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseButton } from "@/styles/buttonStyles";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmitLogin = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("HERE");
    toast.success("خوش آمدید", {
      className: "font-vazir text-[16px] mt-10",
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <h2 className="text-center font-vazir text-2xl font-bold my-5">ورود</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col text-right gap-2 mb-8">
          <Label htmlFor="email" content="ایمیل" />
          <Input
            type="text"
            id="email"
            {...register("email")}
            error={errors.email}
          />
        </div>
        <div className="flex flex-col items-end text-right gap-2 mb-8">
          <Label htmlFor="password" content="رمز عبور" />
          <Input
            type="password"
            id="password"
            {...register("password")}
            error={errors.password}
          />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className={baseButton}>
            {isSubmitting ? "در حال انجام" : "ثبت نام"}
          </button>
        </div>
        <div className="mt-5">
          <Link
            href={"/signup"}
            className="font-vazir font-bold sm:text-[14px] text-[12px]"
          >
            از قبل حساب ندارید؟
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
