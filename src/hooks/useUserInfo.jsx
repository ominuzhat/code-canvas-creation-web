import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
  const [instance] = useAxiosSecure();
  const {
    data: userInfo,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const response = await instance.get(`/user/me`);
      return response.data;
    },
  });
  return [userInfo, refetch, isLoading];
};

export default useUserInfo;
