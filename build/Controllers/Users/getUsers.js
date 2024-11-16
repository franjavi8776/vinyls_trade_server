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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmins = exports.getUsers = void 0;
const Users_1 = require("../../Models/Users");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const findUsers = yield Users_1.Users.findAll({ where: { isAdmin: false } });
    if (findUsers) {
        return { status: 200, json: findUsers };
    }
    else {
        return { status: 404, json: "No se encontraron usuarios registrados" };
    }
});
exports.getUsers = getUsers;
const getAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    const findAdmins = yield Users_1.Users.findAll({ where: { isAdmin: true } });
    if (findAdmins) {
        return { status: 200, json: findAdmins };
    }
    else {
        return { status: 404, json: "No se encontraron usuarios registrados" };
    }
});
exports.getAdmins = getAdmins;
