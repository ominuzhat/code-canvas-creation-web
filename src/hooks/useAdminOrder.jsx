import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminOrder = () => {
  const [instance] = useAxiosSecure();
  const {
    data: allOrders,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["adminOrder"],
    queryFn: async () => {
      const response = await instance.get(`/posts`);
      return response.data;
    },
  });
  return [allOrders, refetch, isLoading];
};

export default useAdminOrder;
