interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  orderId: number;
  userId: number;
  products: OrderItem[];
  totalPrice: number;
  status: "در حال پردازش" | "لغو شده" | "تحویل داده شده" | "حمل شده";
  date: string;
}
