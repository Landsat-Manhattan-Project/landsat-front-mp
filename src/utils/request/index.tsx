import axios, { AxiosInstance } from "axios";
import { useAuthContext } from "../../features/auth/general/model/auth.context";

const useRequest = () => {
  const baseUrl = process.env.REACT_APP_API;

  const { authState } = useAuthContext();

  const configAxiosInstance = (): AxiosInstance => {
    const authToken =
      authState && authState.token ? `Bearer ${authState.token}` : null;

    return axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: authToken,
      },
    });
  };

  const axiosInstance = configAxiosInstance();

  return { axiosInstance };
};

export { useRequest };
