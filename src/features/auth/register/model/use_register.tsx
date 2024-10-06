import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleErrors } from "../../../../utils/error";
import { useRequest } from "../../../../utils/request";
import { useAuthContext } from "../../general/model/auth.context";
import { landsatToast } from "../../../../utils/toast";
import { secret } from "../../../../utils/secret";
import { saveDataLocal } from "../../../../utils/local_storage";
import { Auth } from "../../../../entities/auth";
import { type IFormData } from "../../general/model/use_general_auth";

interface UseRegisterProps {
  formValidate: boolean;
  handleSubmit: () => Promise<void>;
}

const useRegister = (
  formData: IFormData,
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

  const registerSucessfully = async (token: string) => {
    landsatToast(`¡Welcome ${formData.email}!`, "success");
    const result: Auth = {
      email: formData.email,
      token: token,
      role: "user",
      purpose: formData.appPurpose,
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
      landsatToast("Incomplete form.", "error");
      return;
    }
    toggleModal();
    await zoomOut();

    handleErrors(
      async () => {
        const result = await axiosInstance.post("/auth/signup", {
          ...formData,
          purpose: formData.appPurpose,
        });

        await registerSucessfully(result.data.token);
      },
      async (e: any) => {
        setTimeout(async () => {
          await resetZoomOut();
          landsatToast(e.error, "error");

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

export { useRegister, type UseRegisterProps };
