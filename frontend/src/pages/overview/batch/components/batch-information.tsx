import batchOverview from "@api/batch-overview.api";
import type { BatchOverviewBatch } from "@app-types/batch-overview.types";
import Ternary from "@components/ternary";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useCallback } from "react";

type Props = {
  batch: BatchOverviewBatch;
};

const BatchInformation = ({ batch }: Props) => {
  const handleCloseBatch = useCallback(async () => {
    if (batch.closed_on) {
      return;
    }
    const response = await batchOverview.closeBatch(batch.id);
    if (response.status === "success") {
      const batchClosed = new CustomEvent("batchOverview:batch-closed", {
        detail: {
          status: "closed",
        },
      });
      document.dispatchEvent(batchClosed);
    }
  }, [batch.status, batch.id]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Batch</p>
          <p className="text-lg font-semibold">{batch.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Season</p>
          <p className="text-lg font-semibold">{batch.season?.name || "N/A"}</p>
        </div>
        <div className="flex justify-end items-center">
          <Ternary
            when={!batch.closed_on}
            then={
              <Button variant="contained" onClick={handleCloseBatch}>
                Close Batch
              </Button>
            }
            otherwise={
              <p>
                Closed on:&nbsp;
                {dayjs(batch.closed_on).format("DD MMM YYYY").toString()}
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BatchInformation;
