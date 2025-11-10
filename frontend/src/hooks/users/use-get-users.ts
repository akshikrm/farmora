import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import { useEffect, } from "react";
import user from "@api/users.api";
import type { UsersListResponse } from "@app-types/users.types";

const useGetUsers = () => {
	const userData = useAuth();
	const query = useQuery<UsersListResponse>({
		queryKey: ["users"],
		queryFn: async (): Promise<UsersListResponse> => await user.fetchAll(),
		enabled: false,
		initialData: {
			data: [],
			limit: 0,
			page: 0,
			total: 0,
		},
	});

	useEffect(() => {
		if (userData.token) {
			query.refetch();
		}
	}, [userData.token, query]);

	return query;
}


export default useGetUsers;
