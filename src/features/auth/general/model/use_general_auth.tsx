import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./auth.context";
import { saveDataLocal } from "../../../../utils/local_storage";
import { secret } from "../../../../utils/secret";
import { useState } from "react";

export interface IFormData {
  email: string;
  password: string;
  userRolApp?: "user" | "guest";
  role?: string;
  purpose?: string;
}

interface UseGeneralAuthProps {
  loginWithoutSession: () => Promise<void>;
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const useGeneralAuth = (
  zoomIn: () => Promise<void>,
  zoomOut: () => Promise<void>,
  toggleModal: (newVal?: boolean) => void,
  toggleHideButtonModal: (newVal?: boolean) => void
) => {
  const navigate = useNavigate();
  const { encryptData } = secret();
  const { setAuthState } = useAuthContext();

  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    role: "",
    purpose: "",
  });

  const loginWithoutSession = async () => {
    toggleHideButtonModal();
    toggleModal();

    setTimeout(async () => {
      await zoomOut();
      setTimeout(async () => {
        await zoomIn();
        setAuthState({
          userRolApp: "guest",
        });

        const encryptedData = encryptData(JSON.stringify({ role: "guest" }));
        saveDataLocal("auth", encryptedData ?? "");
        navigate("/home");
      }, 2000);
    }, 1000);
  };

  return { loginWithoutSession, formData, setFormData };
};

export { useGeneralAuth, type UseGeneralAuthProps };
