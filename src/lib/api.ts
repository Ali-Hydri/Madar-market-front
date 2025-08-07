import CategoryItem from "@/types/users";
import axios from "axios";
import Product from "@/types/productsType";

const BASE_URL = "http://localhost:3005";

export const getProduct = async (): Promise<Product[]> => {
  const res = await axios.get(`${BASE_URL}/api/product`);
  return res.data;
};
export const getProductById = async (): Promise<Product[]> => {
  const res = await axios.get(`${BASE_URL}/api/product:id`);
  return res.data;
};

export const getCategories = async ():Promise<CategoryItem[]> => {
    const res = await axios.get(`${BASE_URL}/api/category`);
    
    return res.data;
  }
  
  export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
    const url = `${BASE_URL}/api/product?categoryId=${categoryId}`;
    const res = await fetch(url);
  
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }