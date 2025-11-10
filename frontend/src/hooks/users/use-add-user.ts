import user from "@api/users.api";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { NewUserRequest } from "@app-types/users.types";
import toast from "react-hot-toast";

const useAddUser = (onSuccess: () => void) => {
	const methods = useForm<NewUserRequest>({
		defaultValues: {
			name: "",
			username: "",
			password: "",
			package_id: 1,
			status: 1,
			user_type: 0,
			parent_id: 0,
		},
	});


	const mutation = useMutation({
		mutationFn: async (newUser: NewUserRequest) => await user.create(newUser),
		onSuccess: (newUser) => {
			toast.success(`User ${newUser.username} successfully`);
			onSuccess()
		},
		onError: (error) => {
			console.error("Error creating user:", error);
		},
	});

	const onSubmit = (data: NewUserRequest) => {
		mutation.mutate(data);
	}

	return {
		methods, onSubmit
	}

}


export default useAddUser;
