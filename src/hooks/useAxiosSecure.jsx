import axios from "axios";
import { useEffect } from "react";
import useMyContext from "./useMyContext";
import { useRouter } from "next/navigation";

const instance = axios.create({
  baseURL: "https://code-canvas-official-app.onrender.com",
});

const useAxiosSecure = () => {
  const { logOut } = useMyContext();
  const router = useRouter();

  useEffect(() => {
    instance.interceptors.request.use(
      function (config) {
        if (config) {
          config.headers.authorization = localStorage.getItem("access-token");
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },

      function (error) {
        if (
          (error.response && error.response.status === 401) ||
          error.response.status === 403
        ) {
          logOut().then(() => {
            router.push("/login");
          });
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }, [logOut]);
  return [instance];
};

export default useAxiosSecure;
