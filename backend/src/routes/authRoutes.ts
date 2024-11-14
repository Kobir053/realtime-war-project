import express, { Router } from "express";
import { handleLogin, handleRegister, validWarrior } from "../controllers/authController";

const router: Router = express.Router();

router.route("/register").post(handleRegister);

router.route("/login").post(handleLogin);

router.route("/validate").get(validWarrior);

export default router;