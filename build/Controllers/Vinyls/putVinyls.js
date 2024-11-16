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
exports.suspendVinyls = exports.restoreVinyls = exports.changeVinyls = void 0;
const Vinyls_1 = require("../../Models/Vinyls");
const changeVinyls = (body, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { stock } = body;
    const { id } = params;
    const vinilo = yield Vinyls_1.Vinyl.findByPk(id);
    if (vinilo) {
        vinilo.stock = stock;
        yield vinilo.save();
        return "actualizacion exitosa";
    }
    else {
        return "Fallo la actualizacion de stock";
    }
});
exports.changeVinyls = changeVinyls;
const restoreVinyls = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = params;
    const vinilo = yield Vinyls_1.Vinyl.findOne({
        where: {
            id,
        },
        paranoid: false,
    });
    if (vinilo) {
        vinilo.restore();
        vinilo.stock = 1;
        yield vinilo.save();
        return 'Se restauro exitosamente';
    }
    else {
        return 'fallo la restauracion';
    }
});
exports.restoreVinyls = restoreVinyls;
const suspendVinyls = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = params;
    const vinilo = yield Vinyls_1.Vinyl.findOne({
        where: {
            id,
            stock: 0
        }
    });
    if (vinilo) {
        Vinyls_1.Vinyl.destroy({
            where: {
                id,
            },
        });
        return 'se ha suspendido con exito';
    }
    else {
        return 'fallo la suspension del vinilo';
    }
});
exports.suspendVinyls = suspendVinyls;
