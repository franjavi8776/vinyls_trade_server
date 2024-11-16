import { Router } from "express";
import {
  deleteOrder,
  deleteOrderDetail,
  getOrderDetail,
  createOrderDetail,
} from "../Controllers/OrderDetail/getOrderDetail";

const router = Router();

router.get("/get/orderDetail", getOrderDetail);
router.post("/createOrderDetail", createOrderDetail);
router.delete("/delete/deleteOrderDetail", deleteOrderDetail);
router.delete("/deleteOrder", deleteOrder);

export default router;
