import api from "./axios";
import { User } from "@/types/user";

export const createUser = async (
  user: Omit<User, "id">
): Promise<User | null> => {
  try {
    const res = await api.post<User>("/users", user);
    return res.data;
  } catch (error) {
    throw new Error("خطا در ایجاد کاربر");
  }
};
