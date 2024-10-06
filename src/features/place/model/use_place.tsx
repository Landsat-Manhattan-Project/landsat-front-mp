import { useEffect, useState } from "react";
import { useHandleErrors } from "../../../utils/error";
import { useRequest } from "../../../utils/request";
import { Place } from "../../../entities/place";

const usePlace = () => {
  const { handleErrors } = useHandleErrors();
  const { axiosInstance } = useRequest();

  const [places, setPlaces] = useState<Place[]>();

  const getAllPlaces = async () => {
    await handleErrors(async () => {
      const result = await axiosInstance.get("/coordinates");

      if (result.data) {
        setPlaces(result.data.coordinates);
      }
    });
  };

  useEffect(() => {
    getAllPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { places };
};

export { usePlace };
