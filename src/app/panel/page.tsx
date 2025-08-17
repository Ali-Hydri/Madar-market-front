"use client";
import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { fetchUsers, addUser, deleteUser } from "@/services/userService";
import { useRouter } from "next/navigation";
import AddUserPanel from "@/components/adduser/addUserPanel";

// بهتر است این interface در src/types/user.ts باشد
interface User {
  id: string;
  name: string;
  email: string;
  lastname: string;
  phone?: string;
}

// SuccessPopup component
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

// DeleteModal component
function DeleteModal({
  open,
  onClose,
  onConfirm,
  userName,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="mb-4 text-3xl text-red-500">⚠️</div>
        <h2 className="font-bold text-lg mb-2">حذف کاربر</h2>
        <p className="mb-6 text-gray-700">
          آیا از حذف <span className="font-semibold">{userName}</span> مطمئن
          هستید؟
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold cursor-pointer"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

// UserTable component
function UserTable({
  users,
  onDelete,
  isDeleting,
  onRefresh,
  isFetching,
}: {
  users: User[];
  onDelete: (user: User) => void;
  isDeleting: boolean;
  onRefresh: () => void;
  isFetching: boolean;
}) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          لیست کاربران{" "}
          <span className="text-gray-500 text-base">({users.length})</span>
        </h2>
        <button
          onClick={onRefresh}
          className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer ${isFetching ? "opacity-70" : ""}`}
          disabled={isFetching}
        >
          <span className={isFetching ? "animate-spin" : ""}>🔄</span>
          ریفرش
        </button>
      </div>
      <div className="overflow-auto max-h-[50vh]">
        <table className="min-w-full text-center border-separate border-spacing-y-2">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 rounded-tl-lg">#</th>
              <th className="py-2 px-3">نام</th>
              <th className="py-2 px-3">نام خانوادگی</th>
              <th className="py-2 px-3">ایمیل</th>
              <th className="py-2 px-3">شماره همراه</th>
              <th className="py-2 px-3 rounded-tr-lg">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-gray-400 text-lg">
                  <span className="text-3xl block mb-2">😕</span>
                  هیچ کاربری یافت نشد
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={user.id}
                  className="bg-gray-50 hover:bg-orange-50 transition rounded-lg shadow-sm"
                >
                  <td className="py-2 px-3 font-mono text-gray-500">{idx + 1}</td>
                  <td className="py-2 px-3 font-semibold">{user.name}</td>
                  <td className="py-2 px-3 font-semibold">{user.lastname}</td>
                  <td className="py-2 px-3 text-gray-700">{user.email}</td>
                  <td className="py-2 px-3 text-gray-700">{user.phone || "-"} </td>
                  <td className="py-2 px-3 flex gap-2 justify-center">
                    <button
                      onClick={() => router.push(`/user/${user.id}`)}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                    >
                      مشاهده
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                      disabled={isDeleting}
                    >
                      <span className="text-lg">🗑️</span>
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

const queryClient = new QueryClient();

function UsersPageContent() {
  const [successPopup, setSuccessPopup] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });
  const [popupTimeout, setPopupTimeout] = useState<NodeJS.Timeout | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    user: User | null;
  }>({ open: false, user: null });

  // React Query
  const { mutate: addUserMutate, isPending: isAdding } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessPopup("ثبت با موفقیت انجام شد!");
    },
  });
  const { mutate: deleteUserMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccessPopup("حذف با موفقیت انجام شد!");
    },
  });
  const { data, isLoading, error, refetch, isFetching } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: true,
    refetchInterval: 60000,
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

  // Delete modal helpers
  const handleDeleteClick = (user: User) =>
    setDeleteModal({ open: true, user });
  const handleDeleteConfirm = () => {
    if (deleteModal.user) deleteUserMutate(deleteModal.user.id);
    setDeleteModal({ open: false, user: null });
  };
  const handleDeleteCancel = () => setDeleteModal({ open: false, user: null });

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="flex-1 mx-20 p-8  min-h-screen flex flex-col gap-8">
        {/* Success Popup */}
        {successPopup.show && (
          <SuccessPopup
            message={successPopup.message}
            onClose={() => setSuccessPopup({ show: false, message: "" })}
          />
        )}
        {/* Add User Form */}
        <AddUserPanel />
        {/* User Table */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-gray-500">در حال بارگذاری کاربران...</span>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 rounded-lg p-4 text-center font-bold">
            خطا در دریافت داده
          </div>
        ) : (
          <UserTable
            users={data || []}
            onDelete={handleDeleteClick}
            isDeleting={isDeleting}
            onRefresh={refetch}
            isFetching={isFetching}
          />
        )}
        {/* Delete Modal */}
        <DeleteModal
          open={deleteModal.open}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          userName={
            deleteModal.user
              ? `${deleteModal.user.name} ${deleteModal.user.lastname}`
              : ""
          }
        />
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersPageContent />
    </QueryClientProvider>
  );
}

