import { Order } from "@/types/orderType";

export const fetchOrders = async (): Promise<Order[]> => {
  // دریافت سفارشات از localStorage
  const ordersJson = localStorage.getItem("orders");
  if (ordersJson) {
    try {
      const orders: Order[] = JSON.parse(ordersJson);
      // مرتب کردن از جدید به قدیم
      return [...orders].reverse();
    } catch (error) {
      console.error("Error parsing orders from localStorage:", error);
      return [];
    }
  }
  return [];
};