import { Router, type IRouter } from "express";
import healthRouter from "./health";
import labsRouter from "./labs";
import subjectsRouter from "./subjects";
import booksRouter from "./books";
import progressRouter from "./progress";
import aiRouter from "./ai";

const router: IRouter = Router();

router.use(healthRouter);
router.use(labsRouter);
router.use(subjectsRouter);
router.use(booksRouter);
router.use(progressRouter);
router.use(aiRouter);

export default router;
