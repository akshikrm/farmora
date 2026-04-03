import { Button } from "@mui/material";
import { useCallback } from "react";
import seasonOverview from "../api";
import Ternary from "@components/ternary";
import dayjs from "dayjs";

type SeasonInformationProps = {
  name: string;
  batchLength: number;
  closedOn: string | null;
  season_id: number | null;
};

const SeasonInformation = (props: SeasonInformationProps) => {
  const { batchLength, name, closedOn, season_id } = props;
  const handleCloseSeason = useCallback(async () => {
    if (closedOn) {
      return;
    }
    if (!season_id) {
      return;
    }
    const response = await seasonOverview.closeSeason(season_id);
    if (response.status === "success") {
      const seasonClosed = new CustomEvent("seasonOverview:season-closed", {
        detail: {
          status: "closed",
        },
      });
      document.dispatchEvent(seasonClosed);
    }
  }, [season_id]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Season</p>
          <p className="text-lg font-semibold">{name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Batches</p>
          <p className="text-lg font-semibold">{batchLength}</p>
        </div>
        <div className="flex justify-end w-full items-center">
          <Ternary
            when={closedOn === null}
            then={
              <Button variant="contained" onClick={handleCloseSeason}>
                Close Season
              </Button>
            }
            otherwise={
              <p>
                Closed on:&nbsp;
                {dayjs(closedOn).format("DD MMM YYYY").toString()}
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SeasonInformation;
