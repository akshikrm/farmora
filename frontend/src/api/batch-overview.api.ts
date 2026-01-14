import type {
  BatchOverviewFilterRequest,
  BatchOverviewResponse,
} from "@app-types/batch-overview.types";
import fetcher from "@utils/fetcher";

const batchOverview = {
  fetchOverview: (
    filter: BatchOverviewFilterRequest
  ): Promise<BatchOverviewResponse> => {
    const opts = {
      method: "GET" as const,
      filter: { batch_id: filter.batch_id },
    };
    return fetcher("overview/batch", null, opts);
  },
};

export default batchOverview;
