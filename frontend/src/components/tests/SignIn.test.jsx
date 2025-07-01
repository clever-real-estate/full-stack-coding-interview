import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import SignIn from "../SignIn"
import { AuthProvider } from "../../context/AuthContext"

test("renders sign-in form correctly", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </MemoryRouter>
  )

  expect(
    screen.getByRole("heading", { name: /sign in to your account/i })
  ).toBeInTheDocument()
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
})
