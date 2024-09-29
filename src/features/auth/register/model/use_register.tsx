import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    if (formData.email === "" || formData.password === "") {
      setFormValidate(true);
      return;
    }
    toggleModal();
    await zoomOut();

    try {
      throw new TypeError("oops");
      // await zoomIn();
    } catch (error) {
      setTimeout(async () => {
        await resetZoomOut();
        toggleModal(false);
        toggleHideButtonModal(false);
      }, 1000);
    }
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
