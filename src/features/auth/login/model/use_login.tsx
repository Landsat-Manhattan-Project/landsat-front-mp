import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    toggleHideButtonModal();
    await zoomOut();

    try {
      throw new TypeError("oops");
      // await zoomIn();
    } catch (error) {
      setTimeout(async () => {
        await resetZoomOut();
        toggleHideButtonModal(false);
        toggleModal(false);
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

export { useLogin, type UseLoginProps };
