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
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const Users_1 = require("../../Models/Users");
const secretKey = crypto_1.default.randomBytes(32).toString("hex");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, codArea, phoneNumber, city, country, isAdmin, } = userData;
        const userFound = yield Users_1.Users.findOne({ where: { email } });
        if (userFound) {
            return {
                status: 200,
                data: { message: "El correo electrónico ya está registrado" },
            };
        }
        const securityLevel = 10;
        const encryptedPassword = yield bcrypt_1.default.hash(password, securityLevel);
        const newUser = yield Users_1.Users.create({
            name,
            email,
            password: encryptedPassword,
            codArea,
            phoneNumber,
            city,
            country,
            isAdmin,
        });
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, secretKey, {
            expiresIn: "1h",
        });
        return {
            status: 201,
            data: Object.assign(Object.assign({}, newUser.toJSON()), { token }),
        };
    }
    catch (error) {
        console.error("Ha ocurrido un error al crear el usuario:", error);
        return {
            status: 500,
            data: { message: "Error interno del servidor" },
        };
    }
});
exports.createUser = createUser;
const loginUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = loginData;
        const user = yield Users_1.Users.findOne({ where: { email } });
        if (!user) {
            return {
                status: 401,
                data: { message: "Credenciales incorrectas" },
            };
        }
        if (user.password === undefined) {
            return {
                status: 500,
                data: { message: "Error interno del servidor" },
            };
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                status: 401,
                data: { message: "Credenciales incorrectas" },
            };
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secretKey, {
            expiresIn: "1h",
        });
        return {
            status: 200,
            data: { message: "Inicio de sesión exitoso", token, email },
        };
    }
    catch (error) {
        console.error("Ha ocurrido un error al iniciar sesión:", error);
        return {
            status: 500,
            data: { message: "Error interno del servidor" },
        };
    }
});
exports.loginUser = loginUser;
exports.default = { createUser: exports.createUser, loginUser: exports.loginUser };
