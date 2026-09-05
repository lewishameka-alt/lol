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

  it("shows the generation prompt", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByDisplayValue(sampleShot.prompt)).toBeInTheDocument();
    });
  });
});
