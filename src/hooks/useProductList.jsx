import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProductList = () => {
  const [instance] = useAxiosSecure();
  const {
    data: productList,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: async () => {
      const response = await instance.get(`/product`);
      return response.data;
    },
  });
  return [productList, refetch, isLoading];
};

export default useProductList;
