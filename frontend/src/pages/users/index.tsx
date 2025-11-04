import { useState } from "react";
import PageTitle from "@components/PageTitle";
import Table from "@components/Table";
import TableRow from "@components/TableRow";
import TableHeaderCell from "@components/TableHeaderCell";
import TableCell from "@components/TableCell";
import AddNewUser from "./components/add-new-user";
import useGetUsers from "@hooks/users/use-get-users";
import { EditIcon } from "lucide-react";
import EditUser from "./components/edit-user";

const headers = ["ID", "Name", "Username", "User Type", "Reset Flag", "Edit"]

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
	const [isDialogOpen, setOpenAdd] = useState(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const usersList = useGetUsers();

	return (
		<div>
			<div className="flex items-center justify-between">
				<PageTitle title="Users" />
				<button
					onClick={() => setOpenAdd(true)}
					className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
				>
					Add User
				</button>
			</div>
			<div className="mt-6">
				<Table>
					<TableRow>
						{headers.map((header) => (
							<TableHeaderCell key={header} content={header} />
						))}
					</TableRow>
					{usersList.data.data.map((user, i) => (
						<TableRow key={user.id}>
							<TableCell content={i + 1} />
							<TableCell content={user.name} />
							<TableCell content={user.username} />
							<TableCell content={user.user_type} />
							<TableCell content={user.reset_flag ? "Yes" : "No"} />
							<TableCell content={
								<EditIcon className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
									onClick={() => {
										setSelectedId(user.id)
									}}
								/>

							} />
						</TableRow>
					))}
				</Table>
			</div>
			<AddNewUser isShow={isDialogOpen} onClose={() => setOpenAdd(false)} />
			<EditUser selectedId={selectedId} onClose={() => setSelectedId(null)} />
		</div>
	);
};


export default UsersPage;
