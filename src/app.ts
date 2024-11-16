import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

import "./db";
import decodeToken from "./Middlewares/authGoogle";
import { authenticateJWT } from "./Middlewares/authMiddleware";

//! import routes
import vinylsRoutes from "./Routes/vinyls.routes";
import usersRoutes from "./Routes/users.routes";
import reviewsRoutes from "./Routes/reviews.routes";
import loginByEmailRoutes from "./Routes/loginByEmail.routes";
import loginByGoogleRoutes from "./Routes/loginByGoogle.routes";
import paymentsRoutes from "./Routes/payment.routes";
import notificationsRoutes from "./Routes/notifications.routes";
import ordersRoutes from "./Routes/order.routes";
import orderDetailsRoutes from "./Routes/orderDetails.routes";

const server = express();

server.use(express.json());
server.use(express.static("src"));
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(morgan("dev"));

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"]; // Agrega aquí los dominios permitidos
server.use(cors({ origin: allowedOrigins, credentials: true }));

server.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.header("Access-Control-Allow-Origin", origin as string);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

server.use(loginByEmailRoutes);
server.use(vinylsRoutes);
server.use(usersRoutes);

//! Middleware para la autenticación de google
server.use(decodeToken);
server.use(loginByGoogleRoutes);

//! Configuration of routes
server.use(authenticateJWT);
server.use(reviewsRoutes);
server.use(paymentsRoutes);
server.use(notificationsRoutes);
server.use(ordersRoutes);
server.use(orderDetailsRoutes);

export default server;
