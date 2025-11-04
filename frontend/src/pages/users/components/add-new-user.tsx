import { Dialog, DialogContent, } from "@components/dialog";
import UserForm from "./user-form";
import useAddUser from "@hooks/users/use-add-user";

const AddNewUser = ({ isShow, onClose }: { isShow: boolean, onClose: () => void }) => {
	const { methods, onSubmit } = useAddUser(() => onClose())
	return <>
		<Dialog
			headerTitle="Add New User"
			isOpen={isShow}
			onClose={onClose}
		>
			<DialogContent>
				<p className="text-gray-700">Add a new user to the system.</p>
				<UserForm
					methods={methods}
					onSubmit={onSubmit}

				/>
			</DialogContent>
		</Dialog>

	</>;
}


export default AddNewUser;
