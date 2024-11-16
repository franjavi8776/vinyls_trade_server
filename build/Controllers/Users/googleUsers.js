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
const Users_1 = require("../../Models/Users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const secretKey = crypto_1.default.randomBytes(32).toString("hex");
const loginGoogle = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, isAdmin } = body;
    try {
        const user = yield Users_1.Users.findOne({ where: { email } });
        if (!user) {
            const newUser = yield Users_1.Users.create({
                name,
                email,
                isAdmin,
            });
            const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, secretKey, {
                expiresIn: "1h",
            });
            return {
                status: 201,
                data: Object.assign(Object.assign({}, newUser.toJSON()), { token, email }),
            };
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secretKey, {
            expiresIn: "1h",
        });
        return {
            status: 200,
            data: { message: "Inicio de sesión exitoso", token },
        };
    }
    catch (error) {
        return { status: 500, data: "Error interno" };
    }
});
exports.default = loginGoogle;
