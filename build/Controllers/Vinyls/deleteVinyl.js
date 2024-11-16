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
exports.deleteVinyl = void 0;
const Vinyls_1 = require("../../Models/Vinyls");
const Users_1 = require("../../Models/Users");
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const sequelize = new sequelize_1.Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
    dialect: "postgres",
    host: `${DB_HOST}`,
});
const userVinyls = sequelize.model("UserVinyls");
const deleteVinyl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.UserId;
        const vinylId = req.params.VinylId;
        const user = yield Users_1.Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "El usuario no existe" });
        }
        const vinylRelation = yield userVinyls.findOne({
            where: {
                UserId: userId,
                VinylsId: vinylId,
            },
        });
        if (!vinylRelation) {
            return res.status(401).send("No tienes permiso para eliminar ese vinilo");
        }
        yield Vinyls_1.Vinyl.destroy({
            where: {
                id: vinylId,
            },
        });
    }
    catch (error) {
        res.status(401).json({ message: "Ha fallado la eliminación del vinilo" });
    }
});
exports.deleteVinyl = deleteVinyl;
exports.default = exports.deleteVinyl;
