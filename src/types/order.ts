interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  orderId: string;
  userId: string;
  products: OrderItem[];
  totalPrice: number;
  status: "در حال پردازش" | "لغو شده" | "تحویل داده شده" | "حمل شده";
  date: string;
}
