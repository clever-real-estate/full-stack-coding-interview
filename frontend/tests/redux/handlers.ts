import { rest } from "msw";
import { photos } from "../fixtures";

export const handlers = [
  rest.post("http://localhost:8000/api/auth/token/", async (req, res, ctx) => {
    const { username, password } = await req.json();
    if (username === "felipe" && password === "clever") {
      return res(ctx.status(200), ctx.json({ access: "fake-token" }));
    } else {
      return res(ctx.status(401), ctx.json({ message: "Invalid credentials" }));
    }
  }),
  rest.get("http://localhost:8000/api/photos/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(photos));
  }),
  rest.post("http://localhost:8000/api/photos/like/", async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ status: 201 }));
  }),
];
