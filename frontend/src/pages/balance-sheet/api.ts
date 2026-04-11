import fetcherV2 from "@utils/fetcherV2";
import type { BalanceSheetFilterRequest, BalanceSheetResponse } from "./types";

const balanceSheet = {
  fetchBalanceSheet: (filter: BalanceSheetFilterRequest) => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcherV2<BalanceSheetResponse>("balance-sheet", null, opts);
  },
};

export default balanceSheet;
