import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../store/reducers/userSlice";
import axiosInstance from "./axiosInstance"; // Import your axios instance

const useAxiosWithInterceptors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          if (
            error.response.data.message === "Token has expired" ||
            error.response.data.message === "Token is not valid"
          ) {
            // Handle token expiration or invalidation
            dispatch(signOut());
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor on unmount
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]);
};

export default useAxiosWithInterceptors;
