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
exports.inhabilityDeleteUser = exports.restoreUser = exports.deleteAllUsers = exports.deleteUser = void 0;
const Users_1 = require("../../Models/Users");
const inhabilityDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userFind = yield Users_1.Users.update({ isDeleted: true }, {
            where: {
                id
            }
        });
        if (userFind) {
            // const users = {
            //   id: userFind.id,
            //   name: userFind.name
            // }
            // await Users.destroy({
            //   where: {
            //     id,
            //   },
            // });
            res.status(200).json(userFind);
        }
        else {
            res
                .status(400)
                .json({ message: "No se ha encontrado el usuario para eliminar" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Ha fallado la eliminación del usuario" });
    }
});
exports.inhabilityDeleteUser = inhabilityDeleteUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userFind = yield Users_1.Users.findOne({
            where: {
                id,
            },
            paranoid: false,
        });
        if (userFind) {
            userFind.restore();
            yield Users_1.Users.destroy({
                where: {
                    id,
                },
                force: true,
            });
            res.status(200).send(`se ha eliminado al usuario ${id}`);
        }
        else {
            res
                .status(400)
                .json({ message: "No se ha encontrado el usuario para eliminar" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Ha fallado la eliminación del usuario" });
    }
});
exports.deleteUser = deleteUser;
const restoreUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userFind = yield Users_1.Users.update({ isDeleted: false }, // Valores que deseas actualizar
        {
            where: {
                id, // Condición para seleccionar el usuario específico por su ID
            },
        });
        if (userFind) {
            // await userFind.restore();
            // await Users.findOne({
            //   where:{
            //     id,
            //     isDeleted: false
            //   }
            // })
            res.status(200).send(`se ha restaurado al usuario ${id}`);
        }
        else {
            res
                .status(400)
                .json({ message: "No se ha encontrado el usuario para restaurar" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Ha fallado la eliminación del usuario" });
    }
});
exports.restoreUser = restoreUser;
// ! Sólo usar cuando se quiera eliminar a todos los usuarios de la base de datos
const deleteAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Users_1.Users.destroy({
            where: {
                isAdmin: false,
            },
        });
        return {
            status: 200,
            data: "Todos los usuarios han sido eliminados correctamente.",
        };
    }
    catch (error) {
        return { status: 500, data: "Error al eliminar los usuarios:", error };
    }
});
exports.deleteAllUsers = deleteAllUsers;
// export default deleteUser;
