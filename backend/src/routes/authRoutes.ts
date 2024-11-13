import express, { Router } from "express";
import { handleRegister } from "../controllers/authController";

const router: Router = express.Router();

router.route("/register").post(handleRegister);

router.route("/login").post();

export default router;