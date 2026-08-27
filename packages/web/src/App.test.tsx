import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { App } from "./App.js";

const sampleJoke = {
  id: 1,
  setup: "Why do programmers prefer dark mode?",
  punchline: "Because light attracts bugs.",
};

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => sampleJoke,
    })) as unknown as typeof fetch,
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("App", () => {
  it("renders a fetched joke setup", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(sampleJoke.setup)).toBeInTheDocument();
    });
  });

  it("reveals the punchline on demand", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(sampleJoke.setup)).toBeInTheDocument();
    });
    screen.getByRole("button", { name: /reveal punchline/i }).click();
    await waitFor(() => {
      expect(screen.getByText(sampleJoke.punchline)).toBeInTheDocument();
    });
  });
});
