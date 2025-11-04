import type { ListResponse } from "./response.types";

export type NewUserRequest = {
	name: string;
	username: string;
	password: string;
	user_type: number;
	status: number;
	package_id: number;
	parent_id: number;
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

