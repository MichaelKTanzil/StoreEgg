import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const productApi = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const useApi = <T>(url: string, key: unknown[]) => {
  const {
    isLoading,
    isError: error,
    data,
  } = useQuery({
    queryKey: key,
    queryFn: async () => {
      return await getProductApi<T>(url);
    },
  });

  return { data, isLoading, error };
};

export const getProductApi = async <T>(url: string) => {
  const response = await productApi.get<T>(url);
  return response.data;
};
