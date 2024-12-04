import { useApi } from "./useApi";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProductDetail = (url: string) => {
  const { data, isLoading, error } = useApi<Product>(`/products/${url}`, [url]);
  return { detail: data, isLoading, error };
};

export const useProducts = () => {
  const { data, isLoading, error } = useApi<Product[]>("/products", [
    "products",
  ]);
  return { data, isLoading, error };
};
