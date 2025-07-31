"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// function generateOTP() {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// }

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const validateMobile = (value: string) => {
    return /^09\d{9}$/.test(value);
  };

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validateMobile(mobile)) {
      setError("شماره همراه معتبر وارد کنید (مثال: 09123456789)");
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:3005/login", {
        phone: mobile,
      });

      const data = res.data;

      if (!data.status) {
        setError(data.message || "ارسال کد با مشکل مواجه شد");
      } else {
        setGeneratedOtp(data.code);
        setStep("otp");
        setOtp(["", "", "", ""]);
        setOtpError("");
        setSuccess("کد تایید ارسال شد");
        console.log("OTP برای تست:", data.code);
      }
    } catch (err) {
      console.error(err);
      setError("خطای شبکه! لطفا دوباره تلاش کنید");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (idx: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < 3) {
      otpRefs[idx + 1].current?.focus();
    }
    if (!value && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 4);
    if (paste.length === 4) {
      setOtp(paste.split(""));
      setTimeout(() => {
        otpRefs[3].current?.focus();
      }, 50);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    try {
      const res = await axios.post("http://localhost:3005/verify-otp", {
        phone: mobile,
        code: otp.join(""),
      });

      const data = res.data;

      if (data.status) {
        //ذخیره در لوکال استوریج
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isRegistered", data.isRegistered); 
        router.push("/dashboard");
      } else {
        setOtpError(data.message || " کد وارد شده نادرست است");
      }
    } catch (err: any) {
      if (err.response) {
        // درخواست ارسال شده و سرور پاسخ داده ولی وضعیت خطا بود
        const data = err.response.data;

        setOtpError(data.message || "کد وارد شده نادرست است");
      } else {
        // خطای شبکه‌ای یا چیز دیگه
        console.error(err);
        setOtpError("خطای شبکه یا سرور!");
      }
    }
  };

  const faToEnDigits = (str: string) =>
    str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <form
        onSubmit={step === "mobile" ? handleMobileSubmit : handleOtpSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center border border-green-100"
      >

          <div className="flex justify-between relative">
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          {step === "mobile" ? "ورود به حساب کاربری" : "کد تایید را وارد کنید"}
        </h1>
          <div className="absolute -left-26 bottom-12">
            <Link className=" text-red-400 flex gap-1 cursor-pointer" href={"/home"}>
              بازگشت
              <ArrowLeft className="ml-1 w-4 h-4 mt-1" />
            </Link>
          </div>
        </div>
        {step === "mobile" && (
          <div className="w-full mb-4">
            <label className="block mb-2 text-gray-700 font-semibold text-right">
              شماره همراه
            </label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={11}
              value={mobile}
              onChange={(e) => setMobile(faToEnDigits(e.target.value))}
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-lg text-right ${
                error ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="مثال: 09123456789"
              autoFocus
              disabled={isSubmitting}
            />
          </div>
        )}
        {step === "otp" && (
          <div className="w-full mb-6 flex flex-col items-center">
            <div className="mb-2 text-gray-700 text-center text-base">
              کد تایید ۴ رقمی به شماره{" "}
              <span className="font-bold">{mobile}</span> ارسال شد.
            </div>
            <div dir="ltr" className="flex gap-3 justify-center mt-2 mb-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onPaste={idx === 0 ? handleOtpPaste : undefined}
                  className=" w-14 h-14 text-center text-2xl font-bold border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all bg-green-50 shadow-sm"
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            {otpError && (
              <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 mb-2 w-full text-center text-sm">
                {otpError}
              </div>
            )}
            <button
              type="submit"
              disabled={otp.some((d) => d === "")}
              className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              تایید کد
            </button>
            <button
              type="button"
              className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => {
                setStep("mobile");
                setOtp(["", "", "", ""]);
                setOtpError("");
                setSuccess("");
              }}
            >
              تغییر شماره همراه
            </button>
          </div>
        )}
        {error && step === "mobile" && (
          <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 mb-2 w-full text-center text-sm">
            {error}
            <Link
              className="text-blue-500 mr-3 underline"
              href={`/register?phone=${mobile}`}
            >
              ثبت نام
            </Link>
          </div>
        )}
        {success && step === "mobile" && (
          <div className="bg-green-100 text-green-700 rounded-lg px-4 py-2 mb-2 w-full text-center text-sm">
            {success}
          </div>
        )}
        {step === "mobile" && (
          <button
            type="submit"
            disabled={isSubmitting || !mobile}
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
            )}
            ورود
          </button>
        )}
      </form>
    </div>
  );
}
