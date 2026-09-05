import { useCallback, useEffect, useState } from "react";
import type { CategoryMeta, LewisProfile, Shot, ShotCategory } from "./types.js";

type Status = "idle" | "loading" | "error";

export function App() {
  const [profile, setProfile] = useState<LewisProfile | null>(null);
  const [categories, setCategories] = useState<CategoryMeta[]>([]);
  const [category, setCategory] = useState<ShotCategory | "all">("all");
  const [shot, setShot] = useState<Shot | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const [profileRes, categoriesRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/categories"),
        ]);
        if (!profileRes.ok || !categoriesRes.ok) throw new Error("bootstrap failed");
        const profileData: LewisProfile = await profileRes.json();
        const categoriesData: { categories: CategoryMeta[] } = await categoriesRes.json();
        setProfile(profileData);
        setCategories(categoriesData.categories);
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  const fetchShot = useCallback(
    async (excludeId?: number, nextCategory: ShotCategory | "all" = category) => {
      setStatus("loading");
      setCopied(false);
      try {
        const params = new URLSearchParams();
        if (excludeId !== undefined) params.set("exclude", String(excludeId));
        if (nextCategory !== "all") params.set("category", nextCategory);
        const qs = params.toString();
        const res = await fetch(`/api/shots/random${qs ? `?${qs}` : ""}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data: Shot = await res.json();
        setShot(data);
        setStatus("idle");
      } catch {
        setStatus("error");
      }
    },
    [category],
  );

  useEffect(() => {
    void fetchShot(undefined, category);
  }, [category, fetchShot]);

  async function copyPrompt() {
    if (!shot) return;
    try {
      await navigator.clipboard.writeText(shot.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="page">
      <div className="atmosphere" aria-hidden />

      <header className="hero">
        <p className="brand">Lewis</p>
        <h1 className="hero__title">Phone-real Instagram shots</h1>
        <p className="hero__lede">
          Photoreal prompts tuned to look like a normal 19-year-old bloke in regional
          Victoria took them — not AI.
        </p>
      </header>

      <nav className="cats" aria-label="Shot categories">
        <button
          type="button"
          className={category === "all" ? "cat cat--active" : "cat"}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={category === c.id ? "cat cat--active" : "cat"}
            onClick={() => setCategory(c.id)}
            title={c.blurb}
          >
            {c.label}
          </button>
        ))}
      </nav>

      <section className="shot" aria-live="polite">
        {status === "error" && (
          <p className="shot__error" role="alert">
            Could not reach the shot API. Is the server running?
          </p>
        )}

        {status === "loading" && !shot && (
          <p className="shot__loading">Loading a shot…</p>
        )}

        {shot && (
          <div className={status === "loading" ? "shot__body shot__body--dim" : "shot__body"}>
            <p className="shot__kicker">{shot.category.replace("-", " ")}</p>
            <h2 className="shot__title">{shot.title}</h2>
            <p className="shot__vibe">{shot.vibe}</p>

            <dl className="meta">
              <div>
                <dt>Setting</dt>
                <dd>{shot.setting}</dd>
              </div>
              <div>
                <dt>Framing</dt>
                <dd>{shot.framing}</dd>
              </div>
              <div>
                <dt>Lighting</dt>
                <dd>{shot.lighting}</dd>
              </div>
            </dl>

            <label className="prompt-label" htmlFor="prompt">
              Generation prompt
            </label>
            <textarea
              id="prompt"
              className="prompt"
              readOnly
              value={shot.prompt}
              rows={8}
            />

            <div className="actions">
              <button type="button" className="btn btn--primary" onClick={() => void copyPrompt()}>
                {copied ? "Copied" : "Copy prompt"}
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => void fetchShot(shot.id)}
                disabled={status === "loading"}
              >
                {status === "loading" ? "…" : "Another variation"}
              </button>
            </div>
          </div>
        )}
      </section>

      {profile && (
        <section className="rules">
          <h2 className="rules__title">How every image should look</h2>
          <p className="rules__lede">
            {profile.name} · {profile.age} · {profile.heightFtIn} · {profile.weightKg} kg ·{" "}
            {profile.build} · {profile.location}
          </p>
          <p className="rules__priority">{profile.priority}</p>
          <ul className="rules__list">
            {profile.styleRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="rules__note">
            Upload reference photos in chat so face and body stay locked. Realism always wins.
          </p>
        </section>
      )}
    </div>
  );
}
