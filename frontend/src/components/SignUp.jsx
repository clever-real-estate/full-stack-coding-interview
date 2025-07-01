import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    setErrors([])
    setMessage("")

    if (password !== passwordConfirmation) {
      setErrors(["Passwords do not match"])
      return
    }

    try {
      const response = await api.post("/users", {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      })
      setMessage(response.data.message)
      setTimeout(() => {
        navigate("/signin")
      }, 2000)
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors)
      } else {
        setErrors(["An unexpected error occurred. Please try again."])
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center font-sans">
      <div className="max-w-md w-full mx-auto p-4">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
          </div>
          <h2 className="mt-6 text-xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="password-confirmation"
                className="text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                id="password-confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base text-gray-900"
              />
            </div>

            {errors.length > 0 && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                <ul>
                  {errors.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
            {message && (
              <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#0075EB] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-base fill-left-to-right"
            >
              <span>Sign Up</span>
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already a member?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
