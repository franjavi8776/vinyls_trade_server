import { Router } from "express";
import { history, postOrder } from "../Controllers/Order/postOrder";

const router = Router();

router.get("/order", history);
router.post("/order", postOrder);

export default router;
