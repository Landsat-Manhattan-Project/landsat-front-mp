import { useEffect, useState } from "react";
import { useHandleErrors } from "../../../utils/error";
import { useRequest } from "../../../utils/request";
import { Place } from "../../../entities/place";
import { useAuthContext } from "../../auth/general/model/auth.context";

const UseMap = (closeModal: () => void) => {
  const { handleErrors } = useHandleErrors();
  const { axiosInstance } = useRequest();
  const { authState } = useAuthContext();

  const [places, setPlaces] = useState<Place[]>();

  const [isFormFailed, setIsFormFailed] = useState(false);
  const [formData, setFormData] = useState<Omit<Place, "id">>();
  const [newPlaceSaved, setNewPlaceSaved] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllPlaces = async () => {
    if (authState?.userRole === "user") {
      await handleErrors(async () => {
        const result = await axiosInstance.get("/coordinates");

        if (result.data) {
          setPlaces(result.data.coordinates);
        }
      });
    }
  };

  const savePlace = async () => {
    if (formData?.name === "") {
      setIsFormFailed(true);
      return;
    }

    await handleErrors(async () => {
      const result = await axiosInstance.post("/coordinates", formData);

      if (result.status <= 299) {
        setFormData(undefined);
        getAllPlaces();
        closeModal();
        setNewPlaceSaved(true);
      }
    });
  };

  useEffect(() => {
    getAllPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    formData,
    places,
    isFormFailed,
    newPlaceSaved,
    setNewPlaceSaved,
    setFormData,
    getAllPlaces,
    savePlace,
  };
};

export { UseMap };
