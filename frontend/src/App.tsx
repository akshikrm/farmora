import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import { useAuth } from "@store/authentication/context";
import type { ReactNode } from "react";
import UsersPage from "@pages/users";
import Layout from "@components/layout";
import { paths } from "./paths";
import BatchesPage from "@pages/batches";
import SeasonsPage from "@pages/seasons";
import FarmsPage from "@pages/farms";
import ItemsPage from "@pages/items";
import PackagesPage from "@pages/packages";
import SubscriptionsPage from "@pages/subscriptions";
import VendorsPage from "@pages/vendors";

const queryClient = new QueryClient();

const pageComponents: Record<string, React.ComponentType> = {
	"/batches": BatchesPage,
	"/users": UsersPage,
	"/seasons": SeasonsPage,
	"/farms": FarmsPage,
	"/items": ItemsPage,
	"/packages": PackagesPage,
	"/subscriptions": SubscriptionsPage,
	"/vendors": VendorsPage,
};

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthGuard>
				<Layout>
					<Routes>
						<Route
							path="/"
							element={<h1 className="text-2xl capitalize">dashboard</h1>}
						/>
						{paths.map((path) => {
							const Component = pageComponents[path.link];
							return (
								<Route
									key={path.link}
									path={path.link}
									element={Component ? <Component /> : <h1>{path.pathname}</h1>}
								/>
							);
						})}
					</Routes>
				</Layout>
			</AuthGuard>
			<GuestGuard>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</GuestGuard>
		</QueryClientProvider>
	);
}

const AuthGuard = ({ children }: { children: ReactNode }) => {
	const user = useAuth();
	if (!user.token) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

const GuestGuard = ({ children }: { children: ReactNode }) => {
	const user = useAuth();
	if (!user.token) {
		return children;
	}
	return null;
};

export default App;
