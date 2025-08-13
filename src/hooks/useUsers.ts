// src/hooks/useUsers.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProduct, addUser, deleteUser } from "@/services/userService";
import  User  from "@/types/categoriesType";

export const useProduct = () =>
  useQuery<User[]>({
    queryKey: ["product"],
    queryFn: fetchProduct,
  });

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
