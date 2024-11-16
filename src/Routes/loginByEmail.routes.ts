import { Router } from "express";
import { loginUser } from "../Controllers/Users/login.controllers";

const router = Router();

router.post("/login", loginUser);

export default router;
