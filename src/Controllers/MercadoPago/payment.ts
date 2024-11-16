import { Request, Response } from "express";
import mercadopago from "mercadopago";
import { OrderDetail } from "../../Models/orderDetail";
import { deleteOrder, deleteOrderDetail } from "../OrderDetail/getOrderDetail";
import { createOrderDetail } from "../OrderDetail/getOrderDetail";
import { enviarNotificacionDeCompra } from "../Notifications/Notifications";

mercadopago.configure({
  sandbox: true,
  access_token:
    "TEST-5240565219201009-090712-67305e7f259028a53ae62015ae9f6938-1472124079",
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { title, price, units } = req.body;

    const result = await mercadopago.preferences.create({
      items: [
        {
          title: title,
          currency_id: "USD",
          unit_price: price,
          quantity: units,
        },
      ],
      back_urls: {
        success: "https://vinils-trade-client.vercel.app",
        failure: "https://vinils-trade-client.vercel.app",
      },
      auto_return: "approved",
      notification_url:
        "https://vinyls-trade-back-production.up.railway.app/webhook",
    });
    res.status(200).send(result.body.init_point);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    }
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { type } = req.query;
  const paymentId = req.query["data.id"];
  try {
    if (type === "payment") {
      await deleteOrder(req, res);

      const data = await mercadopago.payment.findById(Number(paymentId));
      //console.log(data);
      await OrderDetail.findAll();

      const saveOrder: any = await createOrderDetail(req, res);
      await enviarNotificacionDeCompra(req, res);
      await deleteOrderDetail(req, res);

      res.status(200).json(saveOrder);
    } else {
      res.status(400).json({ message: "Invalid query parameter type" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    }
  }
};
