import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useService = () => {
  const [instance] = useAxiosSecure();
  const {
    data: serviceData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["serviceData"],
    queryFn: async () => {
      const response = await instance.get(`/our-service`);
      return response.data;
    },
  });
  return [serviceData, refetch, isLoading];
};

export default useService;
