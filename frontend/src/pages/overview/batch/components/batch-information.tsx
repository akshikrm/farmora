import type { BatchOverviewBatch } from "@app-types/batch-overview.types";

type Props = {
  batch: BatchOverviewBatch;
};
const BatchInformation = ({ batch }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Batch</p>
          <p className="text-lg font-semibold">{batch.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Season</p>
          <p className="text-lg font-semibold">{batch.season?.name || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default BatchInformation;
