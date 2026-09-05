import express, { type Express } from "express";
import cors from "cors";
import { lewis } from "./profile.js";
import {
  getLewisReferenceLibrary,
  getSettingsReferenceLibrary,
  lewisRefsDir,
  settingsRefsDir,
} from "./references.js";
import {
  getRandomShot,
  getShotById,
  isShotCategory,
  listCategories,
  shots,
  type ShotCategory,
} from "./shots.js";

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/references/lewis", express.static(lewisRefsDir));
  app.use("/references/settings", express.static(settingsRefsDir));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.get("/api/profile", (_req, res) => {
    res.json(lewis);
  });

  app.get("/api/references", (_req, res) => {
    res.json({
      lewis: getLewisReferenceLibrary(),
      settings: getSettingsReferenceLibrary(),
    });
  });

  app.get("/api/references/lewis", (_req, res) => {
    res.json(getLewisReferenceLibrary());
  });

  app.get("/api/references/settings", (_req, res) => {
    res.json(getSettingsReferenceLibrary());
  });

  app.get("/api/categories", (_req, res) => {
    res.json({ categories: listCategories() });
  });

  app.get("/api/shots", (req, res) => {
    const categoryRaw = req.query.category;
    if (typeof categoryRaw === "string" && categoryRaw !== "") {
      if (!isShotCategory(categoryRaw)) {
        res.status(400).json({ error: `Unknown category: ${categoryRaw}` });
        return;
      }
      const filtered = shots.filter((shot) => shot.category === categoryRaw);
      res.json({ count: filtered.length, shots: filtered });
      return;
    }
    res.json({ count: shots.length, shots });
  });

  app.get("/api/shots/random", (req, res) => {
    const excludeRaw = req.query.exclude;
    let excludeId: number | undefined;
    if (typeof excludeRaw === "string" && excludeRaw !== "") {
      const parsed = Number(excludeRaw);
      if (Number.isInteger(parsed)) {
        excludeId = parsed;
      }
    }

    let category: ShotCategory | undefined;
    const categoryRaw = req.query.category;
    if (typeof categoryRaw === "string" && categoryRaw !== "") {
      if (!isShotCategory(categoryRaw)) {
        res.status(400).json({ error: `Unknown category: ${categoryRaw}` });
        return;
      }
      category = categoryRaw;
    }

    res.json(getRandomShot(Math.random, { excludeId, category }));
  });

  app.get("/api/shots/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      res.status(400).json({ error: "id must be an integer" });
      return;
    }

    const shot = getShotById(id);
    if (!shot) {
      res.status(404).json({ error: `No shot with id ${id}` });
      return;
    }

    res.json(shot);
  });

  return app;
}
