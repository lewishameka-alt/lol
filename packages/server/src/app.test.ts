import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";
import { getRandomJoke, jokes } from "./jokes.js";

const app = createApp();

describe("GET /api/health", () => {
  it("reports ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("GET /api/jokes", () => {
  it("returns all jokes", async () => {
    const res = await request(app).get("/api/jokes");
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(jokes.length);
    expect(res.body.jokes).toHaveLength(jokes.length);
  });
});

describe("GET /api/jokes/random", () => {
  it("returns a joke with setup and punchline", async () => {
    const res = await request(app).get("/api/jokes/random");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("setup");
    expect(res.body).toHaveProperty("punchline");
  });
});

describe("GET /api/jokes/:id", () => {
  it("returns a specific joke", async () => {
    const res = await request(app).get("/api/jokes/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("404s for a missing joke", async () => {
    const res = await request(app).get("/api/jokes/9999");
    expect(res.status).toBe(404);
  });

  it("400s for a non-integer id", async () => {
    const res = await request(app).get("/api/jokes/abc");
    expect(res.status).toBe(400);
  });
});

describe("getRandomJoke", () => {
  it("is deterministic given a fixed rng", () => {
    expect(getRandomJoke(() => 0)).toEqual(jokes[0]);
  });
});
