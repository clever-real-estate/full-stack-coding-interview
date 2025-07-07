import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { SignInForm } from "../components/sign-in/SignInForm";

const SignInPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/photos");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-white text-black w-full">
      <div className="w-full max-w-md  rounded-lg p-8 flex flex-col items-center">
        <img src={logo} alt="logo" className="w-16 h-16 mb-6" />
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Sign in to your account
        </h2>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
