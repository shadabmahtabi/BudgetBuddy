import axios from "axios";
import { useDispatch } from "react-redux";
import { signOut } from "../store/reducers/userSlice";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_URL}`,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log("Token being sent:", token); // Ensure no extra spaces or newlines

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       if (
//         error.response.data.message === "Token has expired" ||
//         error.response.data.message === "Token is not valid"
//       ) {
//         // localStorage.removeItem("token");
//         // return error.response
//         // Dispatch signOut action to clear session
//         const dispatch = useDispatch();
//         dispatch(signOut());
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
