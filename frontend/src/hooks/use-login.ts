import { useMutation } from "@tanstack/react-query";
import auth from "@api/auth.api";
import type { LoginPayload } from "@app-types/auth.types";
import { useCallback } from "react";
import toast from "react-hot-toast";

const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (payload: LoginPayload) => auth.login(payload),
    onSuccess: (data) => {
      toast.success("Login successful!");
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

  return { onLogin };
};

export default useLogin;
