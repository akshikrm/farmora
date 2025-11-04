import user from "@api/users.api";
import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import PageTitle from "@components/PageTitle";

type ListResponse<T> = {
	data: T[];
	limit: number;
	page: number;
	total: number;
};

type User = {
	id: number;
	name: string;
	username: string;
	parent_id: number;
	reset_flag: boolean;
	user_type: string;
};

type UsersListResponse = ListResponse<User>;

const UsersPage = () => {
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

	console.log(query.data?.data, query.data?.total);

	useEffect(() => {
		if (userData.token) {
			query.refetch();
		}
	}, [userData.token, query]);

	return <PageTitle title="Users" />;
};

export default UsersPage;
