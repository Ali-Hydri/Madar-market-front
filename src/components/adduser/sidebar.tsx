"use client";
import React, { useEffect, useState } from "react";
import {
  Home,
  User,
  Settings,
  Info,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { LuLayoutPanelTop } from "react-icons/lu";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  lastname: string;
  phone?: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  // تشخیص آیتم فعال بر اساس مسیر فعلی
  const getActiveItem = () => {
    if (pathname === "/") return "/";
    if (pathname === "/panel") return "panel";
    if (pathname === "/panel/profile") return "profile";
    if (pathname === "/panel/setting") return "settings";
    if (pathname === "/panel/UserOrders") return "UserOrders";
    return "panel";
  };

  const [activeItem, setActiveItem] = useState(getActiveItem());

  // بروزرسانی آیتم فعال وقتی مسیر تغییر می‌کند
  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [pathname]);

  // لیست منوها
  const menuItems: MenuItem[] = [
    {
      id: "/",
      label: "داشبورد",
      href: "/",
      icon: <Home size={20} />,
    },
    {
      id:"panel",
      label:"پنل مدیریت",
      href:"/panel",
      icon: <LuLayoutPanelTop size={20} />

    },
    {
      id: "UserOrders",
      label: "سفارش ها",
      href: "/panel/UserOrders",
      icon: <Info size={20} />,
    },
    {
      id: "profile",
      label: "پروفایل",
      href: "/panel/profile",
      icon: <User size={20} />,
    },
    {
      id: "settings",
      label: "تنظیمات",
      href: "/panel/setting",
      icon: <Settings size={20} />,
    },
  ];

  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUserData(JSON.parse(userData));
    } else {
      console.log("کاربر وجود ندارد");
    }
  }, []);

  // تابع باز/بسته کردن sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen">
      {/* دکمه همبرگر */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className=" flex-shrink-0 fixed top-4 right-4  p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-100 cursor-pointer"
          aria-label="باز کردن منو"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      )}

      {/* Sidebar اصلی */}
      <div
        className={` top-0 right-0 h-full bg-gradient-to-br from-white to-gray-50 shadow-2xl transform transition-all duration-300 ease-out  ${
          isOpen ? "translate-x-0 w-75" : "translate-x-full w-0 overflow-hidden"
        }`}
      >
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-300 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">منوی کاربری</h2>
              <p className="text-blue-100 text-sm mt-1">خوش آمدید</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:text-black rounded-lg transition-colors duration-200 cursor-pointer"
              aria-label="بستن منو"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => item.id}
                  className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-200 ${
                    activeItem === item.id
                      ? "bg-gradient-to-r from-blue-300 to-green-600 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:transform hover:scale-102"
                  }`}
                >
                  <div className="flex items-center space-x-4 gap-1 space-x-reverse">
                    <div
                      className={`p-2 ml-1 rounded-xl ${
                        activeItem === item.id
                          ? "bg-green-900 bg-opacity-20"
                          : "bg-gray-100 group-hover:bg-blue-100"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>

                  <ChevronRight
                    size={16}
                    className={`transform transition-transform duration-200 ${
                      activeItem === item.id
                        ? "rotate-180"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              کاربر {userData?.name} عزیز
            </p>
            <p className="text-xs text-gray-400 mt-1">آنلاین</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
