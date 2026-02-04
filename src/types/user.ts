export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "customer" | "admin";
}
