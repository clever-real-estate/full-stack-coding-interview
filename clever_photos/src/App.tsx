import "./App.css";
import SignInPage from "./pages/SignInPage";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PhotosPage } from "./pages/PhotosPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ToastProvider } from "./context/ToastContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="photos" element={<PhotosPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
