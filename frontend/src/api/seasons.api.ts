import type {
  EditSeason,
  EditSeasonPayload,
  NewSeason,
} from "@app-types/season.types";
import fetcher from "@utils/fetcher";

const seasons = {
  fetchAll: () => fetcher("seasons"),
  fetchById: (id: number) => fetcher(`seasons/${id}`),
  create: async (payload: NewSeason) =>
    await fetcher("seasons", JSON.stringify(payload), { method: "POST" }),
  updateById: async (id: number, updateData: EditSeason) => {
    const payload: EditSeasonPayload = {
      name: updateData.name,
      to_date: updateData.to_date,
      from_date: updateData.from_date,
    };
    return await fetcher(`seasons/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default seasons;
