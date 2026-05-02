import type {
  PurchaseBookFilterRequest,
  PurchaseBookItem,
} from "@app-types/purchase-book.types";
import fetcherV2 from "@utils/fetcherV2";

const purchaseBook = {
  fetchAll: (filter: PurchaseBookFilterRequest) => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcherV2<PurchaseBookItem[]>("items/purchase-book", null, opts);
  },
};

export default purchaseBook;
