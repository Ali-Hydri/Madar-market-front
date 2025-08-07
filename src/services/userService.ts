// src/services/userService.ts
import axios from "axios";
import User from "@/types/users";
import { log } from "console";

const BASE_URL = "http://localhost:3005";

export const fetchProduct = async (): Promise<User[]> => {
  const res = await axios.get(`${BASE_URL}/api/product`);
  return res.data;
};

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await axios.post(`${BASE_URL}/users`, user);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/users`, { data: { id } });
};

export const updateUser = async (user: Partial<User>): Promise<User> => {
  // Get token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  
  
  const res = await axios.put(`${BASE_URL}/users`, user, config);
  return res.data; 
};

export const getBoothById = async (id: string): Promise<User> => {
  const res = await axios.get(`${BASE_URL}/users/${id}`);
  return res.data.data;
};

