import { AxiosError } from "axios";

const useHandleErrors = () => {
  const handleErrors = async (
    requestFn: () => Promise<void>,
    onErrorFn?: (e: unknown) => Promise<void>,
    onFinallyFn?: () => Promise<void>
  ) => {
    try {
      return await requestFn();
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error(e.message);
        console.error(e.response?.data);
        console.error(e.response?.status);
        console.error(e.config);
      }
      await onErrorFn?.(e);
    } finally {
      await onFinallyFn?.();
    }
  };

  return { handleErrors };
};

export { useHandleErrors };
