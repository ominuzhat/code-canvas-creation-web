import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";

const useCartList = () => {
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartId = localStorage.getItem("cartId");
      setCartId(storedCartId || null);
    }
  }, []);

  const [instance] = useAxiosSecure();
  const {
    data: cartList,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cartList"],
    queryFn: async () => {
      const response = await instance.get(`/cart/${cartId}`);
      return response.data;
    },
  });
  return [cartList, refetch, isLoading];
};

export default useCartList;
