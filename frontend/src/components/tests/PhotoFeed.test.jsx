import { render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import PhotoFeed from '../PhotoFeed'
import { AuthProvider } from "../../context/AuthContext"

const mockPhotos = [
  {
    id: 1,
    pexels_id: 101,
    photographer: "John Doe",
    alt_text: "A test photo",
    avg_color: "#123456",
    image_url: "url1",
    photographer_url: "url_photog1",
    likes: [],
  },
  {
    id: 2,
    pexels_id: 102,
    photographer: "Jane Smith",
    alt_text: "Another test photo",
    avg_color: "#789abc",
    image_url: "url2",
    photographer_url: "url_photog2",
    likes: [],
  },
]

const server = setupServer(
  http.get("http://localhost:3000/api/v1/photos", () => {
    return HttpResponse.json(mockPhotos)
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders photos after fetching from API", async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <PhotoFeed />
      </AuthProvider>
    </MemoryRouter>
  )

  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("A test photo")).toBeInTheDocument()
  })

  expect(screen.getByText("Jane Smith")).toBeInTheDocument()
  expect(screen.getByText("Another test photo")).toBeInTheDocument()
})
