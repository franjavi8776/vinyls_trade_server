"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("./db");
const authGoogle_1 = __importDefault(require("./Middlewares/authGoogle"));
const authMiddleware_1 = require("./Middlewares/authMiddleware");
//! import routes
const vinyls_routes_1 = __importDefault(require("./Routes/vinyls.routes"));
const users_routes_1 = __importDefault(require("./Routes/users.routes"));
const reviews_routes_1 = __importDefault(require("./Routes/reviews.routes"));
const loginByEmail_routes_1 = __importDefault(require("./Routes/loginByEmail.routes"));
const loginByGoogle_routes_1 = __importDefault(require("./Routes/loginByGoogle.routes"));
const payment_routes_1 = __importDefault(require("./Routes/payment.routes"));
const notifications_routes_1 = __importDefault(require("./Routes/notifications.routes"));
const order_routes_1 = __importDefault(require("./Routes/order.routes"));
const orderDetails_routes_1 = __importDefault(require("./Routes/orderDetails.routes"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(express_1.default.static("src"));
server.use(body_parser_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use((0, cookie_parser_1.default)());
server.use((0, morgan_1.default)("dev"));
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"]; // Agrega aquí los dominios permitidos
server.use((0, cors_1.default)({ origin: allowedOrigins, credentials: true }));
server.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
server.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});
server.use(loginByEmail_routes_1.default);
server.use(vinyls_routes_1.default);
server.use(users_routes_1.default);
//! Middleware para la autenticación de google
server.use(authGoogle_1.default);
server.use(loginByGoogle_routes_1.default);
//! Configuration of routes
server.use(authMiddleware_1.authenticateJWT);
server.use(reviews_routes_1.default);
server.use(payment_routes_1.default);
server.use(notifications_routes_1.default);
server.use(order_routes_1.default);
server.use(orderDetails_routes_1.default);
exports.default = server;
