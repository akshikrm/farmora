
import { useReducer, type ReactNode } from "react";
import { authDataContext, authDispatchContext } from "./context";
import type { AuthActions, AuthContextData } from "@app-types/auth.types";


const authReducer = (state: AuthContextData, action: AuthActions): AuthContextData => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, token: action.payload };
		case "LOGOUT":
			return { ...state, token: null };
		default:
			return state;
	}
}


const initialAuthState: AuthContextData = { token: null }

type AuthProviderProps = {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [value, dispatch] = useReducer(authReducer, initialAuthState);

	return <>
		<authDataContext.Provider value={value}>
			<authDispatchContext.Provider value={dispatch}>
				{children}
			</authDispatchContext.Provider>
		</authDataContext.Provider>
	</>;
}



export default AuthProvider;
