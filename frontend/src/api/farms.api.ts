import type {
  EditFarmPayload,
  EditFarmRequest,
  NewFarmRequest,
} from "@app-types/farms.types";
import fetcher from "@utils/fetcher";

const farms = {
  fetchAll: () => fetcher("farms"),
  fetchById: (id: number) => fetcher(`farms/${id}`),
  create: async (payload: NewFarmRequest) =>
    await fetcher("farms", JSON.stringify(payload), { method: "POST" }),
  updateById: async (id: number, updatedData: EditFarmRequest) => {
    const payload: EditFarmPayload = {
      capacity: updatedData.capacity || undefined,
      place: updatedData.place || undefined,
      name: updatedData.name || undefined,
    };
    return await fetcher(`farms/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default farms;
