import { Router } from "express";
import { logger } from "../utils/logger.js";

const router = Router();

router.get("/datos", (req, res) => {
  res.send(`Server fork`);
});

router.get("/info", (req, res) => {
  const { method, url } = req;
  const info = {
    info: logger.info(`Method: ${method} --- URL: ${url}`),
    warn: logger.warn(`Method: ${method} --- URL: ${url} no implementada`),
    error: logger.error({ message: "Server error" }),
  };
  res.json(info);
});

export default router;
