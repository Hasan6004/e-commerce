import { User } from "@/types/user";
import api from "./axios";

export const getUserByEmailPassword = async (
  email: string,
  password: string
): Promise<User | null> => {
  const res = await api.get<User[]>(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(
      password
    )}`
  );
  if (res.data.length > 0) {
    return res.data[0];
  } else {
    return null;
  }
};
