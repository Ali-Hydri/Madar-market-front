"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateUser } from "@/services/userService";
import User from "@/types/users";

export default function UserRegisterPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  // Get user phone from localStorage or URL params
  const getUserPhone = () => {
    if (typeof window !== "undefined") {
      // Try to get phone from localStorage first
      const storedPhone = localStorage.getItem("user");
      if (storedPhone) {
        const user = JSON.parse(storedPhone);
        return user.phone;
      }

      // If not in localStorage, try to get from URL params
      const urlParams = new URLSearchParams(window.location.search);
      const phoneFromUrl = urlParams.get("phone");
      if (phoneFromUrl) {
        return phoneFromUrl;
      }
    }
    return "";
  };

  useEffect(() => {
    // Auto-fill phone number when component mounts
    const phoneNumber = getUserPhone();
    if (phoneNumber) {
      setForm((prev) => ({
        ...prev,
        phone: phoneNumber,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = getToken();
      if (!token) {
        setError("توکن احراز هویت یافت نشد. لطفا مجددا وارد شوید.");
        setLoading(false);
        return;
      }

      // Validate form
      if (!form.name || !form.lastname || !form.email || !form.phone) {
        setError("لطفا تمام فیلدها را تکمیل کنید.");
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setError("لطفا ایمیل معتبر وارد کنید.");
        setLoading(false);
        return;
      }

      // Phone validation (Iranian phone number format)
      const phoneRegex = /^(\+98|0)?9\d{9}$/;
      if (!phoneRegex.test(form.phone)) {
        setError("لطفا شماره همراه معتبر وارد کنید.");
        setLoading(false);
        return;
      }

      // Prepare user data with token
      const userData: Partial<User> = {
        name: form.name,
        lastname: form.lastname,
        email: form.email,
      };
      console.log(userData);

      // Update user with token authentication
      const updatedUser = await updateUser(userData);

      setSuccess("اطلاعات با موفقیت ذخیره شد!");

      // Store updated user data in localStorage
      const updatedUserData = {
        name: form.name,
        lastname: form.lastname,
        email: form.email,
        phone: form.phone,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      localStorage.setItem("isRegistered", "true");

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: unknown) {
      console.error("Error updating user:", err);
      const error = err as { response?: { status?: number } };
      if (error.response?.status === 401) {
        setError("توکن منقضی شده است. لطفا مجددا وارد شوید.");
      } else if (error.response?.status === 404) {
        setError("کاربر یافت نشد.");
      } else if (error.response?.status === 400) {
        setError("داده‌های ارسالی نامعتبر است.");
      } else {
        setError("خطا در ذخیره اطلاعات. لطفا دوباره تلاش کنید.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          تکمیل اطلاعات کاربر
        </h2>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 rounded-lg px-4 py-3 mb-4 text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg px-4 py-3 mb-4 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              نام *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="نام خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              نام خانوادگی *
            </label>
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="نام خانوادگی خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              ایمیل *
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              شماره همراه *
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
              placeholder="09xxxxxxxxx"
              required
              disabled
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "در حال ذخیره..." : "ذخیره اطلاعات"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="mt-3 w-full bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
        >
          بازگشت به داشبورد
        </button>
      </form>
    </div>
  );
}
