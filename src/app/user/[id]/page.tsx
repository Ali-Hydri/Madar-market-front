"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getBoothById, updateUser } from "@/services/userService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

const queryClient = new QueryClient();

export default function BoothByIdWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <BoothById />
    </QueryClientProvider>
  );
}

// بهتر است این interface در src/types/user.ts باشد
interface User {
  id: string;
  name: string;
  email: string;
  lastname: string;
  phone?: string;
}

function BoothById() {
  const id = useParams().id as string;
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<{ name: string; lastname: string; email: string; phone?: string }>({ name: "", lastname: "", email: "", phone: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data, isLoading, isError, error, refetch } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getBoothById(id),
    enabled: !!id,
  });

  // مقداردهی اولیه فرم پس از دریافت data
  React.useEffect(() => {
    if (data) {
      setForm({ name: data.name, lastname: data.lastname, email: data.email, phone: data.phone || "" });
    }
  }, [data]);

  const { mutate: updateUserMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      setSuccessMsg("تغییرات با موفقیت ذخیره شد!");
      setEditMode(false);
      refetch();
      setTimeout(() => setSuccessMsg(""), 2500);
    },
    onError: () => {
      setErrorMsg("خطا در ذخیره تغییرات!");
      setTimeout(() => setErrorMsg(""), 2500);
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-gray-500">در حال دریافت اطلاعات کاربر...</span>
      </div>
    );
  if (isError)
    return (
      <div className="bg-red-100 text-red-700 rounded-lg p-6 text-center font-bold max-w-md mx-auto mt-16 shadow-lg">
        خطا: {error?.message}
      </div>
    );
  if (!data)
    return (
      <div className="bg-yellow-100 text-yellow-700 rounded-lg p-6 text-center font-bold max-w-md mx-auto mt-16 shadow-lg">
        کاربری با این شناسه یافت نشد
      </div>
    );

  // آواتار با حرف اول نام
  const avatar = data.name?.charAt(0)?.toUpperCase() || "?";

  const handleEdit = () => {
    setEditMode(true);
    setForm({ name: data.name, lastname: data.lastname, email: data.email, phone: data.phone || "" });
  };
  const handleCancel = () => {
    setEditMode(false);
    setForm({ name: data.name, lastname: data.lastname, email: data.email, phone: data.phone || "" });
  };
  const handleSave = () => {
    updateUserMutate({ id: data.id, ...form });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-green-50 to-green-100 py-12 h-screen">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center border border-green-100">
        <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-4xl font-bold text-green-700 shadow mb-6">
          {avatar}
        </div>
        <div className="flex w-full justify-between items-center mb-2">
          <h2 className="text-2xl font-extrabold text-green-700 flex items-center gap-2">
            <span className="inline-block">{data.name} {data.lastname}</span>
          </h2>
          {!editMode && (
            <button
              onClick={handleEdit}
              className="text-gray-500 hover:text-green-600 p-2 rounded-full border border-gray-200 hover:border-green-400 transition-all"
              title="ویرایش کاربر"
            >
              <span className="text-xl cursor-pointer">ویرایش</span>
            </button>
          )}
        </div>
        {successMsg && <div className="bg-green-100 text-green-700 rounded-lg px-4 py-2 mb-2 w-full text-center">{successMsg}</div>}
        {errorMsg && <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 mb-2 w-full text-center">{errorMsg}</div>}
        {editMode ? (
          <div className="flex flex-col gap-4 w-full mt-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-700">نام</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-700">نام خانوادگی</label>
              <input
                type="text"
                value={form.lastname}
                onChange={e => setForm({ ...form, lastname: e.target.value })}
                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-700">ایمیل</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-700">شماره همراه</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value.replace(/[^0-9]/g, "") })}
                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                maxLength={11}
                placeholder="مثال: 09123456789"
              />
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold transition-all cursor-pointer"
                disabled={isUpdating}
              >
                انصراف
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-all disabled:opacity-50 cursor-pointer"
                disabled={isUpdating}
              >
                {isUpdating ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full mt-4">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-lg">🆔</span>
              <span className="font-semibold">شناسه:</span>
              <span className="ltr:font-mono">{data.id}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-lg">📧</span>
              <span className="font-semibold">ایمیل:</span>
              <span className="ltr:font-mono">{data.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-lg">📱</span>
              <span className="font-semibold">شماره همراه:</span>
              <span className="ltr:font-mono">{data.phone || "-"}</span>
            </div>
          </div>
        )}
        <button
          onClick={() => router.back()}
          className="mt-8 px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold shadow transition-all text-base cursor-pointer"
        >
          بازگشت به لیست کاربران
        </button>
      </div>
    </div>
  );
}
