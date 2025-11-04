import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import { useAuth } from "@store/authentication/context";
import type { ReactNode } from "react";
import UsersPage from "@pages/users";

const queryClient = new QueryClient();

const AuthGuard = () => {
	const user = useAuth();
	if (!user.token) {
		return <Navigate to="/login" />
	}
	return <Navigate to="/users" />
}


function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path="/" element={<h1 className="text-2xl capitalize">dashboard</h1>} />
				<Route path="/users" element={<UsersPage />} />
			</Routes>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</QueryClientProvider>
	);
}

export default App;
