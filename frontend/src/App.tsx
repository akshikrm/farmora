import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import { useAuth } from "@store/authentication/context";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

const AuthGuard = ({ children }: { children: ReactNode }) => {
	const user = useAuth();
	if (!user.token) {
		return <LoginPage />;
	}
	return children;
}


function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthGuard>
				<Routes>
					<Route path="/" element={<h1 className="text-2xl capitalize">dashboard</h1>} />
				</Routes>
			</AuthGuard>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</QueryClientProvider>
	);
}

export default App;
