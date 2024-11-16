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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAdmins = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const Users_1 = require("../../Models/Users");
const secretKey = crypto_1.default.randomBytes(32).toString("hex");
const securityLevel = 10;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn: "1h" });
};
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, securityLevel);
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUsers = yield Users_1.Users.findAll({ where: { isAdmin: false } });
        if (findUsers) {
            res.status(200).json(findUsers);
        }
        else {
            res.status(404).json("users not found");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getUsers = getUsers;
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAdmins = yield Users_1.Users.findAll({ where: { isAdmin: true } });
        if (findAdmins) {
            res.status(200).json(findAdmins);
        }
        else {
            res.status(404).json("admins not found");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getAdmins = getAdmins;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, codArea, phoneNumber, city, country, isAdmin, } = req.body;
        const userFound = yield Users_1.Users.findOne({ where: { email } });
        if (userFound) {
            res.status(409).json({ message: "This email is already in use" });
        }
        const encryptedPassword = yield hashPassword(password);
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
        const token = generateToken(Number(newUser.id));
        res.status(201).json(Object.assign(Object.assign({}, newUser.toJSON), { token }));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password, codArea, phoneNumber, city, country, isAdmin, } = req.body;
        // Verificar si el usuario existe
        const user = yield Users_1.Users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Encriptar la nueva contraseña si se proporciona
        let updatedPassword = user.password;
        if (password) {
            updatedPassword = yield hashPassword(password);
        }
        // Actualizar los datos del usuario
        yield user.update({
            name,
            email,
            password: updatedPassword,
            codArea,
            phoneNumber,
            city,
            country,
            isAdmin,
        });
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Users_1.Users.destroy({ where: { id } });
        res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteUser = deleteUser;
