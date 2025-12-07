import type {
  EditUserPayload,
  EditUserRequest,
  NewUserRequest,
} from "@app-types/users.types";
import fetcher from "@utils/fetcher";

const user = {
  fetchAll: () => fetcher("users"),
  fetchById: (id: number) => fetcher(`users/${id}`),
  create: async (userData: NewUserRequest) =>
    await fetcher("auth/signup", JSON.stringify(userData), { method: "POST" }),
  updateById: async (id: number, updateData: EditUserRequest) => {
    const payload: EditUserPayload = {
      name: updateData.name as string,
      status: updateData.status as number,
    };
    return await fetcher(`farms/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default user;
