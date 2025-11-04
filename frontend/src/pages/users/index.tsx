import user from "@api/users.api";
import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import PageTitle from "@components/PageTitle";
import Table from "@components/Table";
import TableRow from "@components/TableRow";
import TableHeaderCell from "@components/TableHeaderCell";
import TableCell from "@components/TableCell";

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

const fakeUsers: User[] = [
	{ id: 1, name: "John Doe", username: "johndoe", parent_id: 0, reset_flag: false, user_type: "admin" },
	{ id: 2, name: "Jane Smith", username: "janesmith", parent_id: 1, reset_flag: false, user_type: "user" },
	{ id: 3, name: "Bob Johnson", username: "bobjohnson", parent_id: 1, reset_flag: true, user_type: "user" },
	{ id: 4, name: "Alice Williams", username: "alicew", parent_id: 0, reset_flag: false, user_type: "moderator" },
	{ id: 5, name: "Charlie Brown", username: "charlieb", parent_id: 1, reset_flag: false, user_type: "user" },
];


const headers = ["ID", "Name", "Username", "User Type", "Reset Flag",]

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


	const { data } = query.data
	useEffect(() => {
		if (userData.token) {
			query.refetch();
		}
	}, [userData.token, query]);


	console.log("Fetched users:", data);

	return (
		<div>
			<PageTitle title="Users" />
			<div className="mt-6">
				<Table>
					<TableRow>
						{headers.map((header) => (
							<TableHeaderCell key={header} content={header} />
						))}
					</TableRow>
					{data.map((user, i) => (
						<TableRow key={user.id}>
							<TableCell content={i + 1} />
							<TableCell content={user.name} />
							<TableCell content={user.username} />
							<TableCell content={user.user_type} />
							<TableCell content={user.reset_flag ? "Yes" : "No"} />
						</TableRow>
					))}
				</Table>
			</div>
		</div>
	);
};

export default UsersPage;
