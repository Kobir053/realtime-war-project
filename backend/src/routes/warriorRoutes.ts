import express, { Router } from "express";
import { handleExploation, handleLaunch } from "../controllers/warriorController";
import { authWithBearer } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.use(authWithBearer);

router.route("/:id/launched").put(handleLaunch);

router.route("/:id/exploaded").put(handleExploation);

export default router; 