import { useCallback, useEffect, useState } from "react";
import type { Joke } from "./types.js";

type Status = "idle" | "loading" | "error";

export function App() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [revealed, setRevealed] = useState(false);

  const fetchJoke = useCallback(async () => {
    setStatus("loading");
    setRevealed(false);
    try {
      const res = await fetch("/api/jokes/random");
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data: Joke = await res.json();
      setJoke(data);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void fetchJoke();
  }, [fetchJoke]);

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span className="app__emoji" aria-hidden>😂</span> lol
        </h1>
        <p className="app__subtitle">A tiny full-stack developer joke generator.</p>
      </header>

      <section className="card" aria-live="polite">
        {status === "error" && (
          <p className="card__error" role="alert">
            Could not reach the joke API. Is the server running?
          </p>
        )}

        {status === "loading" && <p className="card__setup">Loading a fresh one…</p>}

        {status === "idle" && joke && (
          <>
            <p className="card__setup">{joke.setup}</p>
            {revealed ? (
              <p className="card__punchline">{joke.punchline}</p>
            ) : (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setRevealed(true)}
              >
                Reveal punchline
              </button>
            )}
          </>
        )}
      </section>

      <button
        type="button"
        className="btn btn--primary"
        onClick={() => void fetchJoke()}
        disabled={status === "loading"}
      >
        {status === "loading" ? "…" : "Another one"}
      </button>

      <footer className="app__footer">
        Served by <code>@lol/server</code> · rendered by <code>@lol/web</code>
      </footer>
    </main>
  );
}
