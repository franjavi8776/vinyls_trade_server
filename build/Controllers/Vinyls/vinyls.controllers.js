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
exports.getVinylsByDecade = exports.getVinylsForTitleAD = exports.getVinylsForGenre = exports.getVinylsForTitle = exports.deleteVinyl = exports.updateVinyl = exports.createVinyl = exports.getVinyl = exports.getVinyls = void 0;
const sequelize_1 = require("sequelize");
const Vinyls_1 = require("../../Models/Vinyls");
//! CRUD vinyls
const getVinyls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Vinyls_1.Vinyl.findAll();
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getVinyls = getVinyls;
const getVinyl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let vinyl = yield Vinyls_1.Vinyl.findByPk(id);
        res.status(200).json(vinyl);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getVinyl = getVinyl;
const createVinyl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vinyl = yield Vinyls_1.Vinyl.create(req.body);
        res.status(200).json(vinyl);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.createVinyl = createVinyl;
const updateVinyl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const vinyl = yield Vinyls_1.Vinyl.findByPk(id);
        if (!vinyl) {
            res.status(404).json({ error: "Vinyl not found" });
        }
        else {
            yield vinyl.update(req.body);
            res.sendStatus(204);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.updateVinyl = updateVinyl;
const deleteVinyl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Vinyls_1.Vinyl.destroy({ where: { id } });
        res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteVinyl = deleteVinyl;
//! filter vinyls
const getVinylsForTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.query;
        const response = yield Vinyls_1.Vinyl.findAll({
            where: {
                title: {
                    [sequelize_1.Op.like]: `%${title}%`,
                },
            },
        });
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getVinylsForTitle = getVinylsForTitle;
const getVinylsForGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre } = req.query;
        const response = yield Vinyls_1.Vinyl.findAll({
            where: {
                genre: {
                    [sequelize_1.Op.like]: `%${genre}%`,
                },
            },
        });
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getVinylsForGenre = getVinylsForGenre;
const getVinylsForTitleAD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order } = req.query;
        const orderBy = [
            ["title", order === "D" ? "DESC" : "ASC"],
        ];
        const response = yield Vinyls_1.Vinyl.findAll({
            order: orderBy,
        });
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getVinylsForTitleAD = getVinylsForTitleAD;
const getVinylsByDecade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startYear, endYear } = req.query;
        if (!startYear ||
            !endYear ||
            isNaN(Number(startYear)) ||
            isNaN(Number(endYear))) {
            return res.status(400).json({ error: "Invalid startYear or endYear" });
        }
        const response = yield Vinyls_1.Vinyl.findAll({
            where: {
                year: {
                    [sequelize_1.Op.gte]: Number(startYear),
                    [sequelize_1.Op.lte]: Number(endYear),
                },
            },
        });
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
exports.getVinylsByDecade = getVinylsByDecade;
