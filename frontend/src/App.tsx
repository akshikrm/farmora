import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/login";
import { useAuth } from "@store/authentication/context";
import type { ReactNode } from "react";
import UsersPage from "@pages/users";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>
        <Routes>
          <Route
            path="/"
            element={<h1 className="text-2xl capitalize">dashboard</h1>}
          />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
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
  if (user.token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default App;
