import { useEffect, useState } from "react";
import type { SeasonListResponse } from "../types";
import seasons from "../api";

const useGetSeasons = () => {
  const [seasonsList, setSeasonsList] = useState<SeasonListResponse>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  });

  const handleFetchAllSeasons = async () => {
    const res = await seasons.fetchAll();
    if (res.status === "success") {
      if (res.data) {
        setSeasonsList(res.data);
      }
    }
  };
  useEffect(() => {
    handleFetchAllSeasons();
  }, []);

  return { seasonsList, handleFetchAllSeasons };
};

export default useGetSeasons;
