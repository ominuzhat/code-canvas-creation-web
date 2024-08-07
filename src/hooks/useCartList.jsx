import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCartList = () => {
  const [instance] = useAxiosSecure();
  const {
    data: cartList,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cartList"],
    queryFn: async () => {
      const response = await instance.get(`/cart`);
      return response.data;
    },
  });
  return [cartList, refetch, isLoading];
};

export default useCartList;
