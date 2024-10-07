import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleErrors } from "../../../../utils/error";
import { useRequest } from "../../../../utils/request";
import { landsatToast } from "../../../../utils/toast";
import { useAuthContext } from "../../general/model/auth.context";
import { secret } from "../../../../utils/secret";
import { saveDataLocal } from "../../../../utils/local_storage";
import { Auth } from "../../../../entities/auth";
import { type IFormData } from "../../general/model/use_general_auth";

interface UseLoginProps {
  formValidate: boolean;
  handleSubmit: () => Promise<void>;
}

const useLogin = (
  formData: IFormData,
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

  const loginSucessfully = async (data: any) => {
    landsatToast(`¡Welcome ${formData.email}!`, "success");
    const result: Auth = {
      role: data.role,
      purpose: data.purpose,
      email: formData.email,
      token: data.token,
      userRolApp: "user",
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
        console.log(result);

        await loginSucessfully(result.data);
      },
      async (e) => {
        setTimeout(async () => {
          await resetZoomOut();
          landsatToast("Email or password invalid", "error");

          toggleHideButtonModal(false);
          toggleModal(false);
        }, 1000);
      }
    );
  };

  return {
    formValidate,
    handleSubmit,
  };
};

export { useLogin, type UseLoginProps };
