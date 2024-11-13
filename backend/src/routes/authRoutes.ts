import express, { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/authController";

const router: Router = express.Router();

router.route("/register").post(handleRegister);

router.route("/login").post(handleLogin);

export default router;