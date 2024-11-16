import { Request, Response, response } from "express";
import nodemailer from "nodemailer";
import { OrderDetail } from "../../Models/orderDetail";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "vinylstrade@gmail.com",
    pass: "gkelbsstqgblbimv",
  },
});

export const enviarNotificacionDeCompra = async (
  req: Request,
  res: Response
) => {
  const { destinatario, detail, precio } = req.body;
  //console.log(destinatario, detail, precio);
  try {
    const info = await transporter.sendMail({
      from: '"Vinyls-Trade 📀" <vinylstrade@gmail.com>',
      to: "vinylstrade@gmail.com",
      subject: "Confirmación de compra",
      html: `
                <p>¡Muchas gracias por tu compra!</p>
                ${detail.map((vinilo: OrderDetail["dataValues"]) => {
                  return `
                    <p>Vinilo: ${vinilo.name}</p>
                    <p>Precio por Unidad en USD: ${vinilo.amount}</p>
                    <p>Precio Total en USD: ${vinilo.totalAmount}</p>

                `;
                })}
                <p>Precio Final: ${precio}</p>
            `,
    });

    //console.log("Correo electrónico enviado con éxito:", info.response);
    res
      .status(200)
      .json({ message: "Email send successfully", info: response });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
