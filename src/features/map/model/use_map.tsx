import { useEffect, useState } from "react";
import { useHandleErrors } from "../../../utils/error";
import { useRequest } from "../../../utils/request";
import { Place } from "../../../entities/place";
import { useAuthContext } from "../../auth/general/model/auth.context";
import { Metadata } from "../../../entities/metadata";
import { landsatToast } from "../../../utils/toast";

const UseMap = (closeModal: () => void, closeForm: () => void) => {
  const { handleErrors } = useHandleErrors();
  const { axiosInstance, axiosDataApiInstance } = useRequest();
  const { authState } = useAuthContext();

  const [places, setPlaces] = useState<Place[]>();
  const [placeMetadata, setPlaceMetadata] = useState<Metadata>();

  const [isFormFailed, setIsFormFailed] = useState(false);
  const [formData, setFormData] = useState<Omit<Place, "_id">>();
  const [newPlaceSaved, setNewPlaceSaved] = useState(false);

  const getMetadata = async (lat: number, lng: number) => {
    await handleErrors(async () => {
      const result = await axiosDataApiInstance.get(
        `/metadata?latitude=${lat}&longitude=${lng}`
      );

      if (result.data) {
        setPlaceMetadata(result.data);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllPlaces = async () => {
    if (authState?.userRolApp === "user") {
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

      if (formData?.notify) {
        await axiosInstance.post("/landsat/reminder", {
          lat: formData?.latitude,
          lng: formData?.longitude,
        });
      }

      if (result.status <= 299) {
        landsatToast("Place saved sucessfully!", "success");
        closeForm();
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
    placeMetadata,
    setNewPlaceSaved,
    getMetadata,
    setFormData,
    getAllPlaces,
    savePlace,
  };
};

export { UseMap };
