import { Router } from "express";
import { loginGoogle } from "../Controllers/Users/login.controllers";

const router = Router();

router.get("/google", loginGoogle);

export default router;
