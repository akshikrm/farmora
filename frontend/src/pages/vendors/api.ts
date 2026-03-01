import fetcherV2 from "@utils/fetcherV2";
import type {
  VendorDetail,
  VendorFormValues,
  VendorName,
  VendorsListResponse,
} from "./types";

const vendors = {
  fetchAll: () => fetcherV2<VendorsListResponse>("vendors"),
  fetchById: (id: number) => fetcherV2<VendorDetail>(`vendors/${id}`),
  fetchNames: () => fetcherV2<VendorName[]>("vendors/names"),
  create: (payload: VendorFormValues) =>
    fetcherV2<unknown>("vendors", JSON.stringify(payload), {
      method: "POST",
    }),
  updateById: (id: number, payload: VendorFormValues) =>
    fetcherV2<unknown>(`vendors/${id}`, JSON.stringify(payload), {
      method: "PUT",
    }),
};

export default vendors;
