"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }
    jsonwebtoken_1.default.verify(token, 'tu_secreto_secreto', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        const authenticatedUser = user;
        console.log(authenticatedUser);
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
