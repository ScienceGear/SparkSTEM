import { Router, type IRouter } from "express";
import { Zod } from "../lib/api-zod";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = Zod.HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;
