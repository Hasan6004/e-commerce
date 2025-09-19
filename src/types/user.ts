interface Address {
  addressId: number;
  province: string;
  city: string;
  postalCode: number;
  fullAddress: string;
}

interface OrderItem {
  productId: number;
  quantity: number;
}

interface Order {
  orderId: number;
  products: OrderItem[];
  totalPrice: number;
  status: "در حال پردازش" | "لغو شده" | "تحویل داده شده" | "حمل شده";
  date: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  phone?: string;
  orders?: Order[];
  addresses?: Address[];
}
