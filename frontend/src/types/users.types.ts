import type { ListResponse } from "./response.types";

export type NewUserRequest = {
  name: string;
  username: string;
  password: string;
  package_id: number;
  status: number;
};

export type EditUserRequest = Partial<Omit<NewUserRequest, "password">> & {
  id: number;
};

export type EditUserPayload = {
  name: string;
  status: number;
};

type User = {
  id: number;
  name: string;
  username: string;
  parent_id: number;
  reset_flag: boolean;
  user_type: string;
};

export type UsersListResponse = ListResponse<User>;
