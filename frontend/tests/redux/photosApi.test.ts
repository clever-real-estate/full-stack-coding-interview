/**
 * @jest-environment node
 */

import { setupServer } from "msw/node";
import { photosApi } from "../../src/redux/photosApi";
import { createTestStore } from "../../src/redux/store";
import { photos } from "../fixtures";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

describe("photosApi", () => {
  let store;

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  beforeEach(() => {
    store = createTestStore();
  });

  it("getPhotos fetches photos successfully", async () => {
    const result = await store.dispatch(
      photosApi.endpoints.getPhotos.initiate()
    );
    expect(result.data).toEqual(photos);
  });

  it("likePhoto updates the photo like status", async () => {
    const result = await store.dispatch(
      photosApi.endpoints.likePhoto.initiate(1)
    );
    expect(result.data.status).toEqual(201);
  });
});
