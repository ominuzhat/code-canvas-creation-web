import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useOfficeInfo = () => {
  const [instance] = useAxiosSecure();
  const {
    data: officeInfo,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["officeInfo"],
    queryFn: async () => {
      const response = await instance.get(`/core/office-info`);
      return response.data;
    },
  });
  return [officeInfo, refetch, isLoading];
};

export default useOfficeInfo;
