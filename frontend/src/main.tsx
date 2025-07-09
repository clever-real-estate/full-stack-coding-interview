import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/css/index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

import { ProtectedRoute, PublicRoute } from "./components/ProtectedPublicRoutes";
import { AuthProvider } from "./context/auth.context";
import { ThemeProvider } from "./hooks/use-theme";
import AccountLayout from "./layouts/account";
import PasswordUpdatePage from "./pages/account/password-update";
import ProfilePage from "./pages/account/profile";
import ProfileUpdatePage from "./pages/account/profile-update";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import SignInPage from "./pages/auth/sign-in";
import SignUpPage from "./pages/auth/sign-up";
import ErrorPage from "./pages/error";
import PhotoDetails from "./pages/photos/photo-details";
import PhotosPage from "./pages/photos/photos";
import PhotosLikedPage from "./pages/photos/photos-liked";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Toaster closeButton richColors visibleToasts={5} duration={7000} />
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute redirectTo="/account/photos" />}>
              <Route index element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>
            <Route element={<AccountLayout />}>
              <Route path="/account" element={<ProtectedRoute redirectTo="/" />}>
                <Route index element={<ProfilePage />} />
                <Route path="update" element={<ProfileUpdatePage />} />
                <Route path="update-password" element={<PasswordUpdatePage />} />
                <Route path="photos">
                  <Route index element={<PhotosPage />} />
                  <Route path="liked" element={<PhotosLikedPage />} />
                  <Route path=":photoId" element={<PhotoDetails />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
