import axios, { AxiosInstance } from "axios";
import { useAuthContext } from "../../features/auth/general/model/auth.context";

const useRequest = () => {
  const baseUrl = process.env.REACT_APP_API;
  const baseDataUrl = process.env.REACT_APP_DATA_API;

  const { authState } = useAuthContext();

  const configAxiosInstance = (): AxiosInstance => {
    let auth = authState;

    if (authState && typeof authState === "string") {
      auth = JSON.parse(authState);
    }

    const authToken = auth && auth.token ? `Bearer ${auth.token}` : null;

    return axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: authToken,
      },
    });
  };

  const configDataAxiosInstance = (): AxiosInstance => {
    return axios.create({
      baseURL: baseDataUrl,
    });
  };

  const axiosInstance = configAxiosInstance();
  const axiosDataApiInstance = configDataAxiosInstance();

  return { axiosInstance, axiosDataApiInstance };
};

export { useRequest };
