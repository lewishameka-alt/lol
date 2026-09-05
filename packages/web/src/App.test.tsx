import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { App } from "./App.js";

const sampleShot = {
  id: 1,
  category: "selfie",
  title: "Bedroom window selfie",
  vibe: "Just woke up-ish, soft morning",
  setting: "Bedroom near a window",
  framing: "Front-camera selfie",
  lighting: "Cool morning window light",
  prompt: "Photorealistic candid Instagram photo of Lewis Hameka…",
};

const sampleProfile = {
  name: "Lewis Hameka",
  age: 19,
  heightCm: 188,
  heightFtIn: "6'2\"",
  weightKg: 73,
  build: "athletic skinny",
  location: "regional Victoria, Australia",
  priority: "realism over everything",
  styleRules: ["Smartphone photography look"],
  consistencyLocks: ["Same young man"],
  avoid: ["AI look"],
};

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo) => {
      const url = String(input);
      if (url.includes("/api/profile")) {
        return {
          ok: true,
          status: 200,
          json: async () => sampleProfile,
        };
      }
      if (url.includes("/api/categories")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            categories: [{ id: "selfie", label: "Selfies", blurb: "Front-camera" }],
          }),
        };
      }
      if (url.includes("/api/references")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            lewis: {
              library: "lewis",
              subject: "Lewis Hameka",
              count: 1,
              photos: [
                {
                  id: "lewis-01",
                  file: "lewis-01.jpg",
                  kind: "solo",
                  note: "Solo ref",
                  url: "/references/lewis/lewis-01.jpg",
                },
              ],
            },
            settings: {
              library: "settings",
              purpose: "Backgrounds only",
              count: 1,
              photos: [
                {
                  id: "setting-01",
                  file: "setting-01.jpg",
                  vibe: "night-out",
                  note: "Party flash",
                  url: "/references/settings/setting-01.jpg",
                },
              ],
            },
          }),
        };
      }
      return {
        ok: true,
        status: 200,
        json: async () => sampleShot,
      };
    }) as unknown as typeof fetch,
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("App", () => {
  it("renders the Lewis brand and a fetched shot", async () => {
    render(<App />);
    expect(screen.getByText("Lewis")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(sampleShot.title)).toBeInTheDocument();
    });
  });

  it("shows identity and settings reference sections", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Lewis identity refs")).toBeInTheDocument();
      expect(screen.getByText("Background & setting refs")).toBeInTheDocument();
    });
  });
});
