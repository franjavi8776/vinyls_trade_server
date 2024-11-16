import { Router } from "express";
import { createOrder, verifyPayment } from "../Controllers/MercadoPago/payment";

const router = Router();

router.post("/create_order", createOrder);
router.post("/webhook", verifyPayment);

export default router;
