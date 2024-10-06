import { useEffect, useState } from "react";
import { useHandleErrors } from "../../../utils/error";
import { useRequest } from "../../../utils/request";
import { Place } from "../../../entities/place";

const UseMap = (closeModal: () => void) => {
  const { handleErrors } = useHandleErrors();
  const { axiosInstance } = useRequest();

  const [places, setPlaces] = useState<Place[]>();

  const [formData, setFormData] = useState<Omit<Place, "id">>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllPlaces = async () => {
    await handleErrors(async () => {
      const result = await axiosInstance.get("/coordinates");

      if (result.data) {
        setPlaces(result.data.coordinates);
      }
    });
  };

  const savePlace = async () => {
    await handleErrors(async () => {
      const result = await axiosInstance.post("/coordinates", formData);

      if (result.status <= 299) {
        getAllPlaces();
        closeModal();
      }
    });
  };

  useEffect(() => {
    getAllPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { formData, places, setFormData, getAllPlaces, savePlace };
};

export { UseMap };
