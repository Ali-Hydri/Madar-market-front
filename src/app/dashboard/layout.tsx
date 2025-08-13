// app/dashboard/layout.tsx
import "../globals.css"; // اگر نیاز باشه

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-[375px] mx-auto">
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
