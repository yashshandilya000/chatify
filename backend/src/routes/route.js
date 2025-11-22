import express from "express";
import { signup } from "../controller/controller.js";
import { login } from "../controller/controller.js";
import { logout } from "../controller/controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

export default router;
