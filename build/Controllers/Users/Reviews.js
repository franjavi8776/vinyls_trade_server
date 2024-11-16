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
exports.getAllReviews = exports.createReview = void 0;
const Reviews_1 = require("../../Models/Reviews");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, comment, rating } = req.body;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "La calificación debe ser entre 1 y 5 puntos" });
        }
        const newReview = yield Reviews_1.Review.create({ email, comment, rating });
        res.status(201).json(newReview);
    }
    catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.createReview = createReview;
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Reviews_1.Review.findAll();
        return { status: 200, json: reviews };
    }
    catch (error) {
        return { status: 500, json: "Error al traer los reviews" };
    }
});
exports.getAllReviews = getAllReviews;
