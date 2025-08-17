"use client";
import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchOrders } from "@/services/orderService";
import { Order } from "@/types/orderType";

// OrderTable component
function OrderTable({
  orders,
  onOrderClick,
}: {
  orders: Order[];
  onOrderClick: (order: Order) => void;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-20 overflow-x-auto mx-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex gap-1 items-center">
          لیست سفارشات
          <span className="text-gray-500 text-base">({orders.length})</span>
        </h2>
      </div>
      <div className="overflow-auto max-h-[50vh]">
        <table className="min-w-full text-center border-separate border-spacing-y-2">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 rounded-tl-lg">#</th>
              <th className="py-2 px-3">شماره سفارش</th>
              <th className="py-2 px-3">تاریخ</th>
              <th className="py-2 px-3">تعداد محصولات</th>
              <th className="py-2 px-3">مبلغ کل</th>
              <th className="py-2 px-3 rounded-tr-lg">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-gray-400 text-lg">
                  <span className="text-3xl block mb-2">😕</span>
                  هیچ سفارشی یافت نشد
                </td>
              </tr>
            ) : (
              orders.map((order, idx) => (
                <tr
                  key={order.id}
                  className="bg-gray-50 hover:bg-orange-50 transition rounded-lg shadow-sm"
                >
                  <td className="py-2 px-3 font-mono text-gray-500">
                    {idx + 1}
                  </td>
                  <td className="py-2 px-3 font-semibold">#{order.id}</td>
                  <td className="py-2 px-3">{formatDate(order.date)}</td>
                  <td className="py-2 px-3">{order.itemCount} عدد</td>
                  <td className="py-2 px-3 font-semibold text-green-600">
                    {order.totalPrice.toLocaleString()} تومان
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => onOrderClick(order)}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                    >
                      جزییات
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// OrderDetailModal component
function OrderDetailModal({
  order,
  onClose,
}: {
  order: Order | null;
  onClose: () => void;
}) {
  if (!order) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">جزئیات سفارش</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">شماره سفارش:</span>
            <span className="font-bold">#{order.id}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">تاریخ:</span>
            <span>{formatDate(order.date)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">تعداد محصولات:</span>
            <span>{order.itemCount} عدد</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-sm text-gray-500">مبلغ کل:</span>
            <span className="font-bold text-green-600">
              {order.totalPrice.toLocaleString()} تومان
            </span>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-2">
          محصولات سفارش داده شده:
        </h3>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-3 flex items-center gap-3"
            >
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                <p className="text-xs text-gray-600">
                  {item.originalPrice.toLocaleString()} تومان
                </p>
                <p className="text-xs text-gray-400">تعداد: {item.quantity}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 text-center">مجموع:</p>
                <p className="text-sm font-bold text-gray-800 text-left">
                  {(item.originalPrice * item.quantity).toLocaleString()} تومان
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AllOrdersContent() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { data, isLoading, error, refetch, isFetching } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    enabled: true,
    refetchInterval: 60000,
  });

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleModalClose = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Order Detail Modal */}
      <OrderDetailModal order={selectedOrder} onClose={handleModalClose} />

      {/* Order Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-gray-500">در حال بارگذاری سفارشات...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 rounded-lg p-4 text-center font-bold">
          خطا در دریافت داده
        </div>
      ) : (
        <OrderTable orders={data || []} onOrderClick={handleOrderClick} />
      )}
    </div>
  );
}

const queryClient = new QueryClient();

function AllOrders() {
  return (
    <QueryClientProvider client={queryClient}>
      <AllOrdersContent />
    </QueryClientProvider>
  );
}

export default AllOrders;
