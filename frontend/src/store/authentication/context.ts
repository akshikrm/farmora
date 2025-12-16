import type { AuthActions, AuthContextData, AuthDispatchContextData } from "@app-types/auth.types";
import { createContext, useContext } from "react";

const noob = (_action: AuthActions) => { }

export const authDataContext = createContext<AuthContextData>({ token: null });
export const authDispatchContext = createContext<AuthDispatchContextData>(noob);

export const useAuth = () => {
	return useContext(authDataContext);
}

export const useAuthDispatch = () => {
	return useContext(authDispatchContext);
}

