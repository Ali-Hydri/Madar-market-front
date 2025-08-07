"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import circle from "@/assets/register/Ellipse 1988.png";
import circle2 from "@/assets/register/Ellipse 1989.png";
import hands from "@/assets/register/hands login.png";
import sabad from "@/assets/register/چند دست آدم کنار همدیگه که از پایین وارد کادر شده اند و هر کدام یکی از اقلام فروشگاهی در دستشان است.png";
import mobileIcn from "@/assets/register/mobile Icn.png";
import madarText from "@/assets/register/مادر مارکت لاگین.png";
import madarLogo from "@/assets/register/مادر مارکت لوگو لاگین.png";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";

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
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(false);
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
        router.push("/home");
      } else {
        setOtpError(data.message || " کد وارد شده نادرست است");
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        // درخواست ارسال شده و سرور پاسخ داده ولی وضعیت خطا بود
        const errorResponse = err as {
          response: { data: { message?: string } };
        };
        const data = errorResponse.response.data;

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

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (step === "otp" && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, countdown]);

  // Format countdown to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Convert English digits to Persian
  const toPersianDigits = (str: string) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (isResendDisabled) return;

    setIsResendDisabled(true);
    setCountdown(120);

    try {
      const res = await axios.post("http://localhost:3005/login", {
        phone: mobile,
      });

      const data = res.data;

      if (!data.status) {
        setError(data.message || "ارسال کد با مشکل مواجه شد");
      } else {
        setGeneratedOtp(data.code);
        setOtp(["", "", "", ""]);
        setOtpError("");
        setSuccess("کد تایید مجدد ارسال شد");
        console.log("OTP جدید برای تست:", data.code);
      }
    } catch (err) {
      console.error(err);
      setError("خطای شبکه! لطفا دوباره تلاش کنید");
    }
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-white">
      <header className=" fixed top-0 h-[72px]">
        <Link
          href={"/home"}
          className="flex py-[20px] pr-[20px] border-b border-[#EAE8E8] w-[375px] mx-auto"
        >
          <svg
            width="24"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="#B0B0B0"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </header>
      <form
        onSubmit={step === "mobile" ? handleMobileSubmit : handleOtpSubmit}
        className=" px-8 pb-8 max-w-md w-full flex flex-col items-center z-30"
      >
        <div className="flex flex-col justify-center items-center mb-[49px]">
          <Image
            src={madarLogo}
            alt="لوگو مادر مارکت در صفحه لاگین"
            className=" h-[30px] w-[54px]"
          />
          <Image
            src={madarText}
            alt="متن مادر مارکت"
            className=" h-[18px] w-[93px] mt-[13px] mb-[4px]"
          />
          <p className="text-[16px] text-[#BA400B] font-bold">
            فروشگاه سوپر مارکتی{" "}
          </p>
        </div>
        <div className="w-full mx-auto">
          <h1 className="text-2xl font-bold text-[#514F4D] mb-[23px]">ورود</h1>
        </div>
        {step === "mobile" && (
          <div className="w-full mb-4">
            <label className="block mb-2 text-[#787471] font-semibold text-right">
              شماره موبایل خود را وارد کنید
            </label>
            <div className="flex">
              <div className=" bg-[#F7F7F7] w-[46px] h-[46px] rounded-r-2xl border-[1px] border-[#EDEDED] flex justify-center items-center">
                <Image
                  src={mobileIcn}
                  alt="دایره رنگی"
                  className="h-[22px] w-[14px]"
                />{" "}
              </div>{" "}
              <input
                type="tel"
                inputMode="numeric"
                maxLength={11}
                value={mobile}
                onChange={(e) => setMobile(faToEnDigits(e.target.value))}
                className={`w-full border px-4 py-2 rounded-l-[12px] focus:outline-none focus:ring-1 focus:ring-[#FF6A29] text-lg text-right ${
                  error ? "border-red-400" : "border-[#EDEDED]"
                }`}
                placeholder="مثال: 09123456789"
                autoFocus
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}
        {step === "otp" && (
          <div className="w-full mb-6 flex flex-col">
            <div className="mb-2  text-[#787471] text-base">
              کد تایید ۴ رقمی به شماره
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
                  className="w-full h-[48px] text-center text-2xl font-bold border-[1px] border-[#FF6A29] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#FF6A29] transition-all bg-orange-50"
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
              className="w-full mt-2 bg-[#FF6A29] hover:bg-orange-700 text-white font-bold py-2 rounded-[12px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              تایید
            </button>
            <div className="flex justify-between pt-[24px]">
              <div className=" text-[#C4C2C0] flex flex-col">
                <div className="flex ">
                  <div className="flex justify-center items-center">
                    <CiClock2 className="w-[20px] h-[20px] ml-1" />
                    <p className="">دریافت مجدد کد</p>
                  </div>
                  <div className=" border-[1px] border-[#EDEDED] rounded-[8px] mr-[8px] items-center justify-center w-[70px] h-[32px] bg-[#FAFAFA]">
                    <button
                      type="button"
                      className={` py-1 pr-[2px] rounded-lg transition-all flex text-[14px] items-center justify-center gap-2 cursor-pointer ${
                        isResendDisabled
                          ? "text-[#FF5500] cursor-not-allowed"
                          : "text-[#] hover:text-[#FF6A29]"
                      }`}
                      onClick={handleResendOTP}
                      disabled={isResendDisabled}
                    >
                      <p>
                        {countdown === 0
                          ? "ارسال مجدد"
                          : toPersianDigits(formatTime(countdown))}
                      </p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <button
                  type="button"
                  className="text-[#787471] text-[16px] py-2 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:text-[#FF6A29]"
                  onClick={() => {
                    setStep("mobile");
                    setOtp(["", "", "", ""]);
                    setOtpError("");
                    setSuccess("");
                    setCountdown(120);
                    setIsResendDisabled(false);
                  }}
                >
                  <FaRegEdit />
                  <p>ویرایش شماره</p>
                </button>
              </div>
            </div>
          </div>
        )}
        {error && step === "mobile" && (
          <div className="bg-red-100 text-red-700 rounded-lg px-4 py-2 mb-2 w-full text-center text-sm">
            {error}
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
            className="z-30 w-full mt-2 bg-[#FF6A29] hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
            )}
            ورود
          </button>
        )}
        <div className="flex text-[13px] text-[#787471] pt-[16px] z-10">
          {step === "mobile" ? (
            <p className="flex">
              ورود شما به معنای پذیرش {" "}
              <Link href={"#"} className="text-[#02B1EA] underline">
                شرایط خدمات و حریم خصوصی
              </Link>
              است.
            </p>
          ) : (
            ""
          )}
        </div>
      </form>
      <div className="absolute bottom-0 z-0 w-screen flex justify-center">
        <div className="absolute bottom-0 -left-0">
          <Image src={circle} alt="دایره رنگی" className="w-auto h-[300px]" />
        </div>
        <div className="absolute bottom-0 -right-0">
          <Image
            src={circle2}
            alt="دایره رنگی"
            className="w-screen h-[300px]"
          />
        </div>

        {step === "mobile" ? (
          <div className=" bottom-0 ">
            <Image
              src={hands}
              alt="عکس چهار دست"
              className=" h-[170px] w-auto"
            />
          </div>
        ) : (
          <Image src={sabad} alt="عکس چهار دست" className=" h-[170px] w-auto" />
        )}
      </div>
    </div>
  );
}
