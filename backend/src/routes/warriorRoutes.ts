import express, { Router } from "express";

const router: Router = express.Router();

router.route("/:id/launched/:id").put();

router.route("/:id/exploaded/:missileId").put();

export default router; 