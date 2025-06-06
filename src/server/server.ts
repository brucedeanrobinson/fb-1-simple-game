import express from "express";
import type { Request, Response } from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/message", (_req: Request, res: Response): void => {
  res.send("Hello from express!");
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
