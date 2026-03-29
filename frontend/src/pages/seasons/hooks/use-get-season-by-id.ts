import { useEffect, useState } from "react";
import type { SeasonFormValues } from "../types";
import seasons from "../api";
import dayjs from "dayjs";

const defaultValues: SeasonFormValues = {
  name: "",
  status: "active",
  from_date: dayjs().toISOString(),
  to_date: dayjs().add(6, "months").toISOString(),
};

const useGetSeasonById = (selectedId: number | null) => {
  const [dataLoaded, setdataLoaded] = useState(false);
  const [selectedData, setSelectedData] =
    useState<SeasonFormValues>(defaultValues);

  useEffect(() => {
    const handleGetSeasonById = async (id: number) => {
      const res = await seasons.fetchById(id);
      if (res.status === "success") {
        if (res.data) {
          const { from_date, name, status, to_date } = res.data;
          setSelectedData({
            name,
            status,
            from_date,
            to_date,
          });
          setdataLoaded(true);
        }
      }
    };

    if (selectedId) {
      handleGetSeasonById(selectedId);
    } else {
      setSelectedData(defaultValues);
    }
  }, [selectedId]);

  return { dataLoaded, selectedData };
};

export default useGetSeasonById;
