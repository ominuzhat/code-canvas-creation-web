import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCustomerInfo = () => {
  const [instance] = useAxiosSecure();
  const {
    data: customerInfo,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["customerInfo"],
    queryFn: async () => {
      const response = await instance.get(`/customer`);
      return response.data;
    },
  });
  return [customerInfo, refetch, isLoading];
};

export default useCustomerInfo;
