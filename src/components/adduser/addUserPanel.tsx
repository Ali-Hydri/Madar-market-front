"use client";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { addUser } from "@/services/userService";

  

function SuccessPopup({
    message,
    onClose,
  }: {
    message: string;
    onClose: () => void;
  }) {
    return (
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50 animate-fade-in shadow-xl border border-green-600">
        <span className="font-semibold text-base">{message}</span>
        <button
          onClick={onClose}
          className="ml-6 text-white font-bold text-2xl hover:text-green-200 transition-all"
        >
          ×
        </button>
      </div>
    );
  }

function UserForm({
    onSubmit,
    isLoading,
  }: {
    onSubmit: (user: { name: string; lastname: string; email: string; phone?: string }) => void;
    isLoading: boolean;
  }) {
    const [form, setForm] = useState({ name: "", lastname: "", email: "", phone: "" });
    const [errors, setErrors] = useState<{
      name?: string;
      lastname?: string;
      email?: string;
      phone?: string;
    }>({});
  
    const validate = () => {
      const errs: typeof errors = {};
      if (!form.name.trim()) errs.name = "نام الزامی است";
      if (!form.lastname.trim()) errs.lastname = "نام خانوادگی الزامی است";
      if (!form.email.trim()) errs.email = "ایمیل الزامی است";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "ایمیل نامعتبر است";
      if (!form.phone.trim()) errs.phone = "شماره همراه الزامی است";
      else if (!/^09\d{9}$/.test(form.phone)) errs.phone = "شماره همراه معتبر وارد کنید (مثال: 09123456789)";
      setErrors(errs);
      return Object.keys(errs).length === 0;
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        onSubmit(form);
        setForm({ name: "", lastname: "", email: "", phone: "" });
        setErrors({});
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold text-gray-700">نام</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="نام"
              autoComplete="off"
            />
            {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold text-gray-700">نام خانوادگی</label>
            <input
              type="text"
              value={form.lastname}
              onChange={e => setForm({ ...form, lastname: e.target.value })}
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.lastname ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="نام خانوادگی"
              autoComplete="off"
            />
            {errors.lastname && <span className="text-xs text-red-500 mt-1">{errors.lastname}</span>}
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold text-gray-700">ایمیل</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="ایمیل"
              autoComplete="off"
            />
            {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold text-gray-700">شماره همراه</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value.replace(/[^0-9]/g, "") })}
              className={`text-right w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="شماره همراه"
              maxLength={11}
              autoComplete="off"
            />
            {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone}</span>}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            {isLoading && <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"></span>}
            {isLoading ? "در حال ثبت..." : "ثبت کاربر"}
          </button>
        </div>
      </form>
    );
  }

const queryClient = new QueryClient();

function AddUserContent() {
  const [successPopup, setSuccessPopup] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });
  const [popupTimeout, setPopupTimeout] = useState<NodeJS.Timeout | null>(null);

  // React Query
  const { mutate: addUserMutate, isPending: isAdding } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessPopup("ثبت با موفقیت انجام شد!");
    },
  });
  
  // Success popup helper
  const showSuccessPopup = (message: string) => {
    setSuccessPopup({ show: true, message });
    if (popupTimeout) clearTimeout(popupTimeout);
    const timeout = setTimeout(() => {
      setSuccessPopup({ show: false, message: "" });
    }, 3000);
    setPopupTimeout(timeout);
  };


  return (
    <div>
          {successPopup.show && (
        <SuccessPopup
          message={successPopup.message}
          onClose={() => setSuccessPopup({ show: false, message: "" })}
        />
      )}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-[#BA400B]">
        افزودن کاربر جدید
      </h2>
      <UserForm onSubmit={addUserMutate} isLoading={isAdding} />
    </div>
    </div>
  );
}

export default function AddUserPanel() {
    return (
      <QueryClientProvider client={queryClient}>
        <AddUserContent />
      </QueryClientProvider>
    );
  }
  
