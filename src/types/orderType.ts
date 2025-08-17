interface OrderItem {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  quantity: number;
}

interface Order {
  id: number;
  userId: string;
  date: string;
  items: OrderItem[];
  totalPrice: number;
  itemCount: number;
}

export type { Order, OrderItem };