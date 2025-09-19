import { z } from "zod";

export const schema = z.object({
  firstname: z.string().min(1, "فیلد نام خالی است"),
  lastname: z.string().min(1, "فیلد نام خانوادگی خالی است"),
  email: z.string().email("ایمیل نامعتبر است"),
  password: z
    .string()
    .min(1, "یک رمز عبور انتخاب کنید")
    .min(6, "طول رمز حداقل 6 کاراکتر است"),
});

export type FormData = z.infer<typeof schema>;
