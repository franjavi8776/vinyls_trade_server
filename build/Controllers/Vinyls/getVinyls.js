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
exports.getVinylsController = exports.getVinylById = exports.postVinylsController = exports.getAllVinyls = void 0;
const axios_1 = __importDefault(require("axios"));
const Vinyls_1 = require("../../Models/Vinyls");
const postVinylsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield (0, axios_1.default)("http://localhost:3001/data.json");
        const postVinyls = yield Promise.all(data.data.map((vinyl) => __awaiter(void 0, void 0, void 0, function* () {
            const createdVinyl = yield Vinyls_1.Vinyl.create(vinyl);
        })));
        return res.status(200).json({ message: "Post successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' });
    }
});
exports.postVinylsController = postVinylsController;
const getVinylsController = () => __awaiter(void 0, void 0, void 0, function* () {
    const findVinyl = yield Vinyls_1.Vinyl.findAll();
    return findVinyl;
});
exports.getVinylsController = getVinylsController;
const getAllVinyls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getVinylsController();
        // fs.writeFileSync('data.json', JSON.stringify(response, null, 2));
        return res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' });
    }
});
exports.getAllVinyls = getAllVinyls;
const getVinylById = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = param;
    try {
        let vinyl = yield Vinyls_1.Vinyl.findAll({ where: { id } });
        return { status: 200, json: vinyl };
    }
    catch (error) {
        return { status: 500, json: 'El vinilo no existe' };
    }
});
exports.getVinylById = getVinylById;
