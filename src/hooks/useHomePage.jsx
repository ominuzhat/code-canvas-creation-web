import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useHomePage = () => {
  const [instance] = useAxiosSecure();
  const {
    data: homeData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const response = await instance.get(`/core/main-website-page`);
      return response.data;
    },
  });
  return [homeData, refetch, isLoading];
};

export default useHomePage;
