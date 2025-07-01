import React from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import PhotoFeed from "./components/PhotoFeed"
import { AuthProvider } from "./context/AuthContext"

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token")
  return isAuthenticated ? children : <Navigate to="/signin" />
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />{" "}
          <Route
            path="/photos"
            element={
              <PrivateRoute>
                <PhotoFeed />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/photos" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
