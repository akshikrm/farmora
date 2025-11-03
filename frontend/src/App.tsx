import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<h1 className="text-2xl">test</h1>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
