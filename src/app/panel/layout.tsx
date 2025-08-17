// app/dashboard/layout.tsx
import Sidebar from "@/components/adduser/sidebar";
import "../globals.css"; // اگر نیاز باشه

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-orange-50 to-orange-100">
      <Sidebar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
