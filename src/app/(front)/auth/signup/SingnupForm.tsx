"use client";

import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/label/Label";
import { baseButton } from "@/styles/buttonStyles";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormData, schema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import StepIndicator from "./StepIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SingnupForm = () => {
  const [step, setStep] = useState<1 | 2>(1);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const nextStep = async () => {
    const valid = await trigger(["name", "lastname"]);
    if (valid) {
      setStep(2);
    }
  };

  const handleSignupSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    router.push("/login");
    toast.success("ثبت نام با موفقیت انجام شد", {
      className: "font-vazir text-[16px] mt-10",
    });
    // toast.error("خطا در ثبت نام", {
    //   className: "font-vazir text-[16px] mt-10",
    // });
  };

  return (
    <form onSubmit={handleSubmit(handleSignupSubmit)}>
      <div>
        <StepIndicator step={step} isSubmitted={isSubmitted} />
      </div>
      <h2 className="text-center font-vazir text-2xl font-bold my-5">
        ثبت نام
      </h2>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col text-right gap-2 mb-8">
                <Label htmlFor="name" content="نام" />
                <Input
                  type="text"
                  id="name"
                  {...register("name")}
                  error={errors.name}
                />
              </div>
              <div className="flex flex-col text-right gap-2 mb-8">
                <Label htmlFor="lastname" content="نام خانوادگی" />
                <Input
                  type="text"
                  id="lastname"
                  {...register("lastname")}
                  error={errors.lastname}
                />
              </div>
              <button type="button" className={baseButton} onClick={nextStep}>
                ادامه
              </button>
              <div className="mt-5">
                <Link
                  href={"/login"}
                  className="font-vazir font-bold sm:text-[14px] text-[12px]"
                >
                  از قبل حساب دارید؟
                </Link>
              </div>
            </div>
          </motion.div>
        )}
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {step === 2 && (
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
                <button
                  type="button"
                  className={`${baseButton} mr-4`}
                  onClick={() => setStep(1)}
                >
                  بازگشت
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={baseButton}
                >
                  {isSubmitting ? "در حال انجام" : "ثبت نام"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </form>
  );
};

export default SingnupForm;
