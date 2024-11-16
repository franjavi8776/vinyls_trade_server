import { Router } from "express";
import { enviarNotificacionDeCompra } from "../Controllers/Notifications/Notifications";

const router = Router();

router.post("send_notification", enviarNotificacionDeCompra);

export default router;
