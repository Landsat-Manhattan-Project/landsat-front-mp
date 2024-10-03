import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleErrors } from "../../../../utils/error";
import { useRequest } from "../../../../utils/request";
import { useAuthContext } from "../../general/model/auth.context";
import { landsatToast } from "../../../../utils/toast";
import { secret } from "../../../../utils/secret";
import { saveDataLocal } from "../../../../utils/local_storage";

interface UseRegisterProps {
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

const useRegister = (
  resetZoomOut: () => Promise<void>,
  zoomIn: () => Promise<void>,
  zoomOut: () => Promise<void>,
  toggleModal: (newVal?: boolean) => void,
  toggleHideButtonModal: (newVal?: boolean) => void
) => {
  const { encryptData } = secret();
  const navigate = useNavigate();
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

  const registerSucessfully = async (token: string) => {
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
    toggleModal();
    await zoomOut();

    handleErrors(
      async () => {
        const result = await axiosInstance.post("/auth/signup", formData);

        await registerSucessfully(result.data.token);
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

export { useRegister, type UseRegisterProps };
