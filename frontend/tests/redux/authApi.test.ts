/**
 * @jest-environment node
 */

import { setupServer } from "msw/node";
import { authApi } from "../../src/redux/authApi";
import { createTestStore } from "../../src/redux/store";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

describe("authApi", () => {
  let store;

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  beforeEach(() => {
    store = createTestStore();
  });

  it("getToken should return a token for valid credentials", async () => {
    const result = await store.dispatch(
      authApi.endpoints.getToken.initiate({
        username: "felipe",
        password: "clever",
      })
    );
    expect(result.data).toEqual({ access: "fake-token" });
  });

  it("getToken should return an error for invalid credentials", async () => {
    const result = await store.dispatch(
      authApi.endpoints.getToken.initiate({
        username: "invalid",
        password: "user",
      })
    );
    expect(result.error).toEqual({
      status: 401,
      data: { message: "Invalid credentials" },
    });
  });
});
