import type { NewUserRequest } from "@app-types/users.types";
import fetcher from "@utils/fetcher";

const user = {
	fetchAll: () => fetcher("auth/users"),
	create: async (userData: NewUserRequest) => await fetcher("auth/signup", JSON.stringify(userData))


};

export default user;
