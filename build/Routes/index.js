"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsers = exports.routerAuth = exports.router = void 0;
const express_1 = require("express");
const getVinyls_1 = require("../Controllers/Vinyls/getVinyls");
const postUser_1 = require("../Controllers/Users/postUser");
const googleUsers_1 = __importDefault(require("../Controllers/Users/googleUsers"));
const authMiddleware_1 = require("../Middlewares/authMiddleware");
const postVinyl_1 = require("../Controllers/Vinyls/postVinyl");
const Reviews_1 = require("../Controllers/Users/Reviews");
const payment_1 = require("../Controllers/MercadoPago/payment");
const putVinyls_1 = require("../Controllers/Vinyls/putVinyls");
const getUsers_1 = require("../Controllers/Users/getUsers");
const postOrder_1 = require("../Controllers/Order/postOrder");
const deleteUser_1 = require("../Controllers/Users/deleteUser");
const postOrderDetail_1 = require("../Controllers/OrderDetail/postOrderDetail");
const Notifications_1 = require("../Controllers/Notifications/Notifications");
const getOrderDetail_1 = require("../Controllers/OrderDetail/getOrderDetail");
const orderDetail_1 = require("../Models/orderDetail");
const router = (0, express_1.Router)();
exports.router = router;
const routerAuth = (0, express_1.Router)();
exports.routerAuth = routerAuth;
const routerUsers = (0, express_1.Router)();
exports.routerUsers = routerUsers;
router.get("/", getVinyls_1.getAllVinyls);
//! Ruta para registrar un nuevo usuario
router.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, postUser_1.createUser)(req.body);
        return res.status(user.status).json(user.data);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
routerUsers.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, getUsers_1.getUsers)();
        return res.status(users.status).json(users.json);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
routerUsers.get("/admins", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, getUsers_1.getAdmins)();
        return res.status(users.status).json(users.json);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
router.delete("/deleteUser/:id", deleteUser_1.deleteUser);
router.put("/inhabilityUser/:id", deleteUser_1.inhabilityDeleteUser);
router.put("/restoreUser/:id", deleteUser_1.restoreUser);
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vinyl = yield (0, getVinyls_1.getVinylById)(req.params);
        return res.status(vinyl.status).json(vinyl.json);
    }
    catch (error) {
        return res.status(404).json(error);
    }
}));
//! Ruta para iniciar sesión
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, postUser_1.loginUser)(req.body);
        return res.status(user.status).json(user.data);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
//! Ruta para autenticación con google
routerAuth.get("/google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const infoUser = req.user;
    try {
        const user = yield (0, googleUsers_1.default)(infoUser);
        return res.status(user.status).json(user.data);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
router.get("/protectedResource", authMiddleware_1.authenticateJWT, (req, res) => {
    res.json({ message: "Ruta protegida" });
});
router.get("/protectedResource", authMiddleware_1.authenticateJWT, (req, res) => {
    res.json({ message: "Ruta protegida" });
});
//Vinilos
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vinyl = yield (0, postVinyl_1.postVinyl)(req.body);
        return res.status(vinyl.status).json(vinyl.json);
    }
    catch (error) {
        return res.status(404).json(error);
    }
}));
router.post("/vinyls", getVinyls_1.postVinylsController);
router.put("/upgrade_vinyls/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, putVinyls_1.changeVinyls)(req.body, req.params);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
router.patch("/restore_vinyls/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, putVinyls_1.restoreVinyls)(req.params);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
router.delete("/delete_vinyls/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, putVinyls_1.suspendVinyls)(req.params);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
//! Ruta para agregar una reseña
router.post("/reviews", Reviews_1.createReview);
router.get('/get/allReviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield (0, Reviews_1.getAllReviews)();
        return res.status(reviews.status).json(reviews.json);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
//Mercado Pago
router.post("/create_order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const payment = yield (0, payment_1.createOrder)(req.body);
        return res.status(206).json(payment);
    }
    catch (error) {
        return res.status(406).json(error);
    }
}));
router.post("/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    console.log(queryParams);
    try {
        const webhook = yield (0, payment_1.verifyPayment)(queryParams);
        res.status(207).json(webhook);
    }
    catch (error) {
        res.status(407).json(error);
    }
}));
router.post("/createOrderDetail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, postOrderDetail_1.createOrderDetail)(req.body);
        res.status(response.status).json(response.json);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
router.get("/get/order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, postOrder_1.history)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
// ! Sólo usar cuando se quiera eliminar a todos los usuarios de la base de datos
router.delete("/deleteUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteSucces = yield (0, deleteUser_1.deleteAllUsers)();
        return res.status(deleteSucces.status).json(deleteSucces.data);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
router.post("/lala", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { destinatario, nombreVinilo, precio } = req.body;
    console.log(destinatario, nombreVinilo, precio);
    try {
        const response = yield (0, Notifications_1.enviarNotificacionDeCompra)(destinatario, nombreVinilo, precio);
        res.status(200).send("Se ha enviado correctamente");
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
router.delete("/delete/deleteOrderDetail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, getOrderDetail_1.getOrderDetail)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
router.delete("/deleteOrder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, getOrderDetail_1.getOrder)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
router.get('/get/orderDetail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield orderDetail_1.OrderDetail.findAll();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
