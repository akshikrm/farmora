import type {
  BatchOverviewFilterRequest,
  BatchOverviewResponse,
} from "@app-types/batch-overview.types";
import fetcherV2, { type FetcherReturnType } from "@utils/fetcherV2";

const batchOverview = {
  fetchOverview: (
    filter: BatchOverviewFilterRequest,
  ): Promise<FetcherReturnType<BatchOverviewResponse>> => {
    const opts = {
      method: "GET" as const,
      filter: { batch_id: filter.batch_id },
    };
    return fetcherV2<BatchOverviewResponse>("overview/batch", null, opts);
  },
};

export default batchOverview;
