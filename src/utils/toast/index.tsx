import { toast, ToastOptions } from "react-toastify";

type ToastType = "success" | "loading" | "error" | "info" | "warning";

const options: ToastOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  style: {
    backgroundColor: "rgba(17, 25, 40, 1)",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    color: "white",
  },
  progressStyle: {
    color: "white",
  },
  progress: undefined,
};

const landsatToast = (
  message: string,
  type?: ToastType,
  toastOptions?: ToastOptions
) => {
  switch (type) {
    case "success":
      toast.success(message, {
        ...toastOptions,
        ...options,
      });
      break;
    case "error":
      toast.error(message, {
        ...toastOptions,
        ...options,
      });
      break;
    case "info":
      toast.info(message, {
        ...toastOptions,
        ...options,
      });
      break;
    case "loading":
      toast.loading(message, {
        ...toastOptions,
        ...options,
      });
      break;
    case "warning":
      toast.warning(message, {
        ...toastOptions,
        ...options,
      });
      break;

    default:
      toast(message, {
        ...toastOptions,
        ...options,
      });
      break;
  }
};

export { landsatToast };
