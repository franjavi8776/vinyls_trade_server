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
exports.loginGoogle = exports.loginUser = void 0;
const Users_1 = require("../../Models/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const secretKey = crypto_1.default.randomBytes(32).toString("hex");
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn: "1h" });
};
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = yield Users_1.Users.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "email or password incorrect" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "email or password incorrect" });
        }
        const token = generateToken(Number(user === null || user === void 0 ? void 0 : user.id));
        return res.status(200).json({
            message: "Start session successfully",
            token,
            email: user === null || user === void 0 ? void 0 : user.email,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.loginUser = loginUser;
const loginGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    //console.log("req.body", req.body);
    try {
        let user = yield Users_1.Users.findOne({ where: { email } });
        if (!user) {
            user = yield Users_1.Users.create({
                name,
                email,
            });
            const token = generateToken(Number(user.id));
            return {
                status: 201,
                data: Object.assign(Object.assign({}, user.toJSON()), { token, email }),
            };
        }
        const token = generateToken(Number(user.id));
        res.status(200).json({
            message: "Starting session successfully",
            token,
            email: user.email,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.loginGoogle = loginGoogle;
