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
exports.postVinyl = void 0;
const Vinyls_1 = require("../../Models/Vinyls");
const postVinyl = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { artists, title, year, genre, cover_image, style, price } = body;
    try {
        if (!artists || !title || !year || !genre || !cover_image || !style || !price) {
            return { status: 404, json: "Faltan datos" };
        }
        yield Vinyls_1.Vinyl.findOrCreate({
            where: { title },
            defaults: { artists, title, year, genre, cover_image, style, price },
        });
        const vinyls = yield Vinyls_1.Vinyl.findAll();
        return { status: 200, json: vinyls };
    }
    catch (error) {
        return { status: 500, json: error };
    }
});
exports.postVinyl = postVinyl;
