"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "../services/AuthService";
import ByPassLogin from "../middleware/ByPassLogin";
import ImageIcon from "../components/ImageIcon";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    setAlert("");
    try {
      await AuthService.auth({ email, password });

      router.push("/photos");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError("");
    setAlert("");
    try {
      await AuthService.forgotPassword({ email });
      setAlert("Password reset email sent");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center p-4">
      <div className="w-[319px]">
        <div className="flex justify-center mb-5 mt-7 md:mt-0">
          {<ImageIcon />}
        </div>
        <h1 className="text-2xl font-helvetica font-bold mb-6 text-center">
          Sign in to your account
        </h1>

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {alert && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 rounded-lg">
            {alert}
          </div>
        )}

        <label className="block mb-2 font-semibold">Username</label>
        <input
          type="email"
          className="w-full h-[44px] p-2 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <div className="flex justify-between">
          <label className="block mb-2 font-semibold">Password</label>
          <label
            className="block mb-2 text-[#0075EB] hover:cursor-pointer"
            onClick={() => handleForgotPassword()}
          >
            Forgot password?
          </label>
        </div>
        <input
          type="password"
          className="w-full h-[44px] p-2 mb-6 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg h-[44px] ${
            loading
              ? "bg-[#0075EB] opacity-45 cursor-not-allowed"
              : "bg-[#0075EB] hover:bg-[#0061c7] hover:cursor-pointer"
          }`}
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
      </div>
    </div>
  );
}

export default ByPassLogin(LoginPage);
