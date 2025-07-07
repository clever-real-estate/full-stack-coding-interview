import "./App.css";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
