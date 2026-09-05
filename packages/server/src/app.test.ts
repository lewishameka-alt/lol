import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";
import { getRandomShot, shots } from "./shots.js";
import { lewis } from "./profile.js";

const app = createApp();

describe("GET /api/health", () => {
  it("reports ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("GET /api/profile", () => {
  it("returns Lewis profile", async () => {
    const res = await request(app).get("/api/profile");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(lewis.name);
    expect(res.body.heightCm).toBe(188);
    expect(res.body.weightKg).toBe(73);
    expect(res.body.styleRules.some((r: string) => /sunglasses/i.test(r))).toBe(true);
    expect(
      res.body.consistencyLocks.some((r: string) => /different people|mates/i.test(r)),
    ).toBe(true);
  });
});

describe("GET /api/categories", () => {
  it("lists shot categories", async () => {
    const res = await request(app).get("/api/categories");
    expect(res.status).toBe(200);
    expect(res.body.categories.length).toBeGreaterThan(0);
    expect(res.body.categories[0]).toHaveProperty("id");
    expect(res.body.categories[0]).toHaveProperty("label");
  });
});

describe("GET /api/references", () => {
  it("returns lewis and settings libraries", async () => {
    const res = await request(app).get("/api/references");
    expect(res.status).toBe(200);
    expect(res.body.lewis.count).toBe(30);
    expect(res.body.settings.count).toBe(10);
    expect(res.body.lewis.photos[0].url).toMatch(/^\/references\/lewis\//);
    expect(res.body.settings.photos[0].url).toMatch(/^\/references\/settings\//);
  });
});

describe("GET /api/references/settings", () => {
  it("returns setting refs only", async () => {
    const res = await request(app).get("/api/references/settings");
    expect(res.status).toBe(200);
    expect(res.body.library).toBe("settings");
    expect(res.body.count).toBe(10);
  });
});

describe("static reference images", () => {
  it("serves a lewis photo", async () => {
    const res = await request(app).get("/references/lewis/lewis-01.jpg");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/image\/jpeg/);
  });

  it("serves a settings photo", async () => {
    const res = await request(app).get("/references/settings/setting-01.jpg");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/image\/jpeg/);
  });
});

describe("GET /api/shots", () => {
  it("returns all shots", async () => {
    const res = await request(app).get("/api/shots");
    expect(res.status).toBe(200);
    expect(res.body.count).toBe(shots.length);
    expect(res.body.shots).toHaveLength(shots.length);
  });

  it("filters by category", async () => {
    const res = await request(app).get("/api/shots?category=gym");
    expect(res.status).toBe(200);
    expect(res.body.shots.every((s: { category: string }) => s.category === "gym")).toBe(
      true,
    );
  });

  it("400s for unknown category", async () => {
    const res = await request(app).get("/api/shots?category=space");
    expect(res.status).toBe(400);
  });
});

describe("GET /api/shots/random", () => {
  it("returns a shot with a prompt", async () => {
    const res = await request(app).get("/api/shots/random");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("prompt");
    expect(res.body.prompt).toContain("Lewis Hameka");
    expect(res.body.prompt).toMatch(/sunglasses/i);
    expect(res.body.prompt).toMatch(/completely different people/i);
  });

  it("never returns the excluded shot", async () => {
    for (let i = 0; i < 50; i++) {
      const res = await request(app).get("/api/shots/random?exclude=1");
      expect(res.status).toBe(200);
      expect(res.body.id).not.toBe(1);
    }
  });

  it("respects category filter", async () => {
    for (let i = 0; i < 20; i++) {
      const res = await request(app).get("/api/shots/random?category=car");
      expect(res.status).toBe(200);
      expect(res.body.category).toBe("car");
    }
  });
});

describe("GET /api/shots/:id", () => {
  it("returns a specific shot", async () => {
    const res = await request(app).get("/api/shots/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("404s for a missing shot", async () => {
    const res = await request(app).get("/api/shots/9999");
    expect(res.status).toBe(404);
  });

  it("400s for a non-integer id", async () => {
    const res = await request(app).get("/api/shots/abc");
    expect(res.status).toBe(400);
  });
});

describe("getRandomShot", () => {
  it("is deterministic given a fixed rng", () => {
    expect(getRandomShot(() => 0)).toEqual(shots[0]);
  });

  it("excludes the requested shot id", () => {
    const result = getRandomShot(() => 0, { excludeId: shots[0].id });
    expect(result.id).not.toBe(shots[0].id);
  });
});
