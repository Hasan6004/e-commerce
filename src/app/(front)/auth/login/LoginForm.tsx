"use client";

import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/label/Label";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseButton } from "@/styles/buttonStyles";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdOutlineArrowForward } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loginUser } from "@/lib/redux/slices/userSlice";
import { AppDispatch } from "@/lib/redux/store";

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmitLogin = async (data: LoginFormData) => {
    try {
      await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();
      toast.success("خوش آمدید", {
        className: "font-vazir text-[16px] mt-10",
      });
      router.push("/home");
    } catch (error) {
      if (isErrorWithMessage(error)) {
        toast.error(error.message, {
          className: "font-vazir text-[16px] mt-10",
        });
      } else if (error instanceof Error) {
        toast.error(error.message, {
          className: "font-vazir text-[16px] mt-10",
        });
      } else {
        toast.error(error as string, {
          className: "font-vazir text-[16px] mt-10",
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <div className="flex flex-row justify-end">
        <Link href={"/home"}>
          <MdOutlineArrowForward size={24} className="cursor-pointer" />
        </Link>
      </div>
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
            {isSubmitting ? "در حال انجام" : "ورود"}
          </button>
        </div>
        <div className="mt-5">
          <Link
            href={"/auth/signup"}
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
