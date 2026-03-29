import fetcherV2 from "@utils/fetcherV2";
import type { SeasonFormValues, SeasonListResponse } from "./types";
import fetcher from "@utils/fetcher";

const seasons = {
  fetchAll: () => fetcherV2<SeasonListResponse>("seasons"),
  getNames: () => fetcher("seasons/names"),
  fetchById: (id: number) => fetcherV2<SeasonFormValues>(`seasons/${id}`),
  create: async (payload: SeasonFormValues) =>
    await fetcherV2("seasons", JSON.stringify(payload), { method: "POST" }),
  updateById: async (id: number, updateData: SeasonFormValues) => {
    const payload: SeasonFormValues = {
      name: updateData.name,
      to_date: updateData.to_date,
      from_date: updateData.from_date,
      status: updateData.status,
    };
    return await fetcherV2(`seasons/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default seasons;
