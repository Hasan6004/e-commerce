import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z
    .string()
    .min(1, "یک رمز عبور انتخاب کنید")
    .min(6, "طول رمز حداقل 6 کاراکتر است"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
