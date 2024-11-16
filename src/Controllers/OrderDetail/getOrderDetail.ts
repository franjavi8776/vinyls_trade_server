import { Request, Response } from "express";
import { Order } from "../../Models/Order";
import { OrderDetail } from "../../Models/orderDetail";

export const getOrderDetail = async (req: Request, res: Response) => {
  try {
    const response = await OrderDetail.findAll();
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const createOrderDetail = async (req: Request, res: Response) => {
  const { cart } = req.body;
  console.log(cart);
  const cartMap = cart.map(async (c: any) => {
    const createOD = await OrderDetail.create({
      name: c.name,
      vinylId: c.vinylId,
      units: c.units,
      amount: c.amount,
      taxAmount: c.taxAmount,
      totalAmount: c.totalAmount,
      orderStatus: c.orderStatus,
    });
    return createOD;
  });
  try {
    res.status(200).json(cartMap);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteOrderDetail = async (req: Request, res: Response) => {
  try {
    const orderDetails = await OrderDetail.findAll();

    if (orderDetails.length > 0) {
      for (const orderDetail of orderDetails) {
        await orderDetail.destroy();
      }
      res.status(200).send({ message: "Deleted order details" });
    } else {
      res.status(404).send({ message: "orderDetails not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    //console.log(orders);
    if (orders.length > 0) {
      // Si hay registros, elimínalos uno por uno
      for (const order of orders) {
        await order.destroy();
      }
      res.status(200).json({ message: "Deleted order details successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
