import { Request, Response } from "express";
import { Order } from "../../Models/Order";

export const history = async (req: Request, res: Response) => {
  try {
    const youOrder = await Order.findAll();
    res.status(200).json(youOrder);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const postOrder = async (req: Request, res: Response) => {
  const { userEmail, detail, tax, total, state } = req.body;
  try {
    const saveOrder = await Order.create({
      userEmail,
      detail,
      tax,
      total,
      state,
    });
    res.status(200).json(saveOrder);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
