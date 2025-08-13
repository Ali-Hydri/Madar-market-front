import React, { useState, useEffect } from "react";
import fireFrame from "@/assets/body/fire frame.png";
import Arrows from "@/assets/body/3Arrows.png";
import Image from "next/image";

function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Convert English digits to Persian
  const toPersianDigits = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toString()
      .padStart(2, "0")
      .replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
  };

  return (
    <div className="w-full mx-auto flex justify-center">
      <div className="flex items-center justify-between mt-[24px] border-1 border-[#FFCACA] bg-[#FDF2F6] w-[327px] h-[57px] rounded-[10px]">
        <div className="flex items-center gap-2 mr-[12px] ">
          <Image src={fireFrame} alt="لوگو" className="w-[34px] h-[34px]" />{" "}
          <div className="text-[#DE030A] my-[13px]">
            <div>جشنواره فروش</div>
            <div className="justify-center flex">
              <p className="font-bold"> ویـــــــــــژه!</p>
              <Image
                src={Arrows}
                alt="لوگو"
                className="w-[25px] h-[13px] mt-[4px]"
              />{" "}
            </div>
          </div>
        </div>
        <div className="grid grid-flow-col gap-3 text-center auto-cols-max pl-3 font-bold">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-[30px] h-[24px] bg-[#FA2C37] rounded-[4px] text-white justify-center items-center text-sm">
            <span className="countdown font-mono text-">
              <span
                style={{ "--value": 59 } as React.CSSProperties}
                aria-live="polite"
                aria-label={toPersianDigits(timeLeft.seconds)}
              >
                {toPersianDigits(timeLeft.seconds)}
              </span>
            </span>
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-[30px] h-[24px] bg-[#FA2C37] rounded-[4px] text-white justify-center items-center text-sm">
            <span className="countdown font-mono ">
              <span
                style={{ "--value": 24 } as React.CSSProperties}
                aria-live="polite"
                aria-label={toPersianDigits(timeLeft.minutes)}
              >
                {toPersianDigits(timeLeft.minutes)}
              </span>
            </span>
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-[30px] h-[24px] bg-[#FA2C37] rounded-[4px] text-white justify-center items-center text-sm">
            <span className="countdown font-mono ">
              <span
                style={{ "--value": 10 } as React.CSSProperties}
                aria-live="polite"
                aria-label={toPersianDigits(timeLeft.hours)}
              >
                {toPersianDigits(timeLeft.hours)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
