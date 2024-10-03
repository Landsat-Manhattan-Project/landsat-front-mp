import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleErrors } from "../../../../utils/error";
import { useRequest } from "../../../../utils/request";
import { landsatToast } from "../../../../utils/toast";
import { useAuthContext } from "../../general/model/auth.context";
import { secret } from "../../../../utils/secret";
import { saveDataLocal } from "../../../../utils/local_storage";

interface UseLoginProps {
  formData: {
    email: string;
    password: string;
  };
  formValidate: boolean;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  handleSubmit: () => Promise<void>;
  loginWithoutSession: () => Promise<void>;
}

const useLogin = (
  resetZoomOut: () => Promise<void>,
  zoomIn: () => Promise<void>,
  zoomOut: () => Promise<void>,
  toggleModal: (newVal?: boolean) => void,
  toggleHideButtonModal: (newVal?: boolean) => void
) => {
  const navigate = useNavigate();
  const { encryptData } = secret();
  const { handleErrors } = useHandleErrors();
  const { axiosInstance } = useRequest();

  const { setAuthState } = useAuthContext();

  const [formValidate, setFormValidate] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginWithoutSession = async () => {
    toggleHideButtonModal();
    toggleModal();

    setTimeout(async () => {
      await zoomOut();
      setTimeout(async () => {
        await zoomIn();
        navigate("/home");
      }, 2000);
    }, 1000);
  };

  const loginSucessfully = async (token: string) => {
    landsatToast(`¡Bienvenido ${formData.email}!`, "success");
    const result = {
      email: formData.email,
      token: token,
    };

    await zoomIn();
    setAuthState(result);
    const encryptedData = encryptData(JSON.stringify(result));
    saveDataLocal("auth", encryptedData ?? "");
    navigate("/home");
  };

  const handleSubmit = async () => {
    if (formData.email === "" || formData.password === "") {
      setFormValidate(true);
      return;
    }

    // Animation
    toggleModal();
    toggleHideButtonModal();
    await zoomOut();

    handleErrors(
      async () => {
        const result = await axiosInstance.post("/auth/login", formData);

        await loginSucessfully(result.data.token);
      },
      async (e) => {
        setTimeout(async () => {
          await resetZoomOut();
          toggleHideButtonModal(false);
          toggleModal(false);
        }, 1000);
      }
    );
  };

  return {
    formData,
    formValidate,
    setFormData,
    handleSubmit,
    loginWithoutSession,
  };
};

export { useLogin, type UseLoginProps };
