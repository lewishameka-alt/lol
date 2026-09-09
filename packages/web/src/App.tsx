import { useCallback, useEffect, useState } from "react";
import type {
  CategoryMeta,
  LewisProfile,
  ReferencesPayload,
  Shot,
  ShotCategory,
} from "./types.js";

type Status = "idle" | "loading" | "error";

export function App() {
  const [profile, setProfile] = useState<LewisProfile | null>(null);
  const [categories, setCategories] = useState<CategoryMeta[]>([]);
  const [references, setReferences] = useState<ReferencesPayload | null>(null);
  const [category, setCategory] = useState<ShotCategory | "all">("all");
  const [shot, setShot] = useState<Shot | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const [profileRes, categoriesRes, referencesRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/categories"),
          fetch("/api/references"),
        ]);
        if (!profileRes.ok || !categoriesRes.ok || !referencesRes.ok) {
          throw new Error("bootstrap failed");
        }
        const profileData: LewisProfile = await profileRes.json();
        const categoriesData: { categories: CategoryMeta[] } = await categoriesRes.json();
        const referencesData: ReferencesPayload = await referencesRes.json();
        setProfile(profileData);
        setCategories(categoriesData.categories);
        setReferences(referencesData);
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

      {references && (
        <section className="refs">
          <h2 className="refs__title">Lewis identity refs</h2>
          <p className="refs__lede">
            Face / body / sunglasses lock only. Mates in frame are never copied.
          </p>
          <div className="refs__grid">
            {references.lewis.photos.map((photo) => (
              <figure key={photo.id} className="refs__item">
                <img src={photo.url} alt={photo.note} loading="lazy" />
                <figcaption>
                  <span className="refs__kind">{photo.kind}</span>
                  {photo.note}
                </figcaption>
              </figure>
            ))}
          </div>

          <h2 className="refs__title refs__title--spaced">Background & setting refs</h2>
          <p className="refs__lede">
            Place, lighting, and vibe only — never copy people from these frames.
          </p>
          <div className="refs__grid">
            {references.settings.photos.map((photo) => (
              <figure key={photo.id} className="refs__item">
                <img src={photo.url} alt={photo.note} loading="lazy" />
                <figcaption>
                  <span className="refs__kind">{photo.vibe}</span>
                  {photo.note}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

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
          <h3 className="rules__subtitle">Hard locks</h3>
          <ul className="rules__list">
            {profile.consistencyLocks.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="rules__note">
            Lewis likeness comes only from identity refs. Settings refs are backgrounds and
            vibes. Sunglasses stay on every shot. Mates are never copied. Realism always wins.
          </p>
        </section>
      )}
    </div>
  );
}
