import { useMutation } from "@tanstack/react-query";
import auth from "@api/auth.api";
import type { LoginPayload } from "@app-types/auth.types";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAuthDispatch } from "@store/authentication/context";
import { useNavigate } from "react-router";

const useLogin = () => {
	const dispatch = useAuthDispatch();
	const methods = useForm<LoginPayload>({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const navigate = useNavigate()
	const mutation = useMutation({
		mutationFn: async (payload: LoginPayload) => auth.login(payload),
		onSuccess: (data) => {
			toast.success("Login successful!");
			dispatch({ type: "LOGIN", payload: data.token });
			localStorage.setItem("auth_token", data.token);
			navigate("/users");
			console.log(data);
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	const onLogin = useCallback(
		(payload: LoginPayload) => {
			mutation.mutate(payload);
		},
		[mutation],
	);

	return { onLogin, methods };
};

export default useLogin;
