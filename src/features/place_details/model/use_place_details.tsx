import { useEffect, useState } from "react";
import { Metadata } from "../../../entities/metadata";
import { useRequest } from "../../../utils/request";
import { useHandleErrors } from "../../../utils/error";
import { Place } from "../../../entities/place";

const usePlaceDetails = (place: Place) => {
  const { handleErrors } = useHandleErrors();
  const { axiosDataApiInstance } = useRequest();

  const [history, setHistory] = useState<Metadata[]>([]);

  const mockPlaceMetadata = (place: Metadata, times: number) => {
    console.log("bro");
    const theHistory: Metadata[] = [];
    for (let i = 0; i < times; i++) {
      let lastDateRegistered;
      if (theHistory.length > 0) {
        lastDateRegistered = theHistory[theHistory.length - 1].acquisition_date;
      }
      const date = new Date(lastDateRegistered ?? place.acquisition_date);
      date.setDate(date.getDate() - 14);

      const metadata: Metadata = {
        ...place,
        acquisition_date: date.toISOString(),
      };

      theHistory.push(metadata);
    }

    return theHistory;
  };

  const getMetadata = async (lat: number, lng: number) => {
    await handleErrors(async () => {
      const result = await axiosDataApiInstance.get(
        `/metadata?latitude=${lat}&longitude=${lng}`
      );

      if (result.data) {
        console.log(result.data);
        const r = mockPlaceMetadata(result.data, 5);
        console.log(r);
        setHistory(r);
      }
    });
  };

  useEffect(() => {
    getMetadata(place.latitude, place.longitude);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    history,
  };
};

export { usePlaceDetails };
