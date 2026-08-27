import express, { type Express } from "express";
import cors from "cors";
import { getJokeById, getRandomJoke, jokes } from "./jokes.js";

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  app.get("/api/jokes", (_req, res) => {
    res.json({ count: jokes.length, jokes });
  });

  app.get("/api/jokes/random", (_req, res) => {
    res.json(getRandomJoke());
  });

  app.get("/api/jokes/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      res.status(400).json({ error: "id must be an integer" });
      return;
    }

    const joke = getJokeById(id);
    if (!joke) {
      res.status(404).json({ error: `No joke with id ${id}` });
      return;
    }

    res.json(joke);
  });

  return app;
}
