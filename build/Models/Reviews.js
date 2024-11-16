"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.initReview = void 0;
const sequelize_1 = require("sequelize");
class Review extends sequelize_1.Model {
}
exports.Review = Review;
const initReview = (sequelize) => {
    Review.init({
        email: {
            type: sequelize_1.DataTypes.STRING,
        },
        comment: {
            type: sequelize_1.DataTypes.TEXT,
        },
        rating: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Review',
        timestamps: false
    });
};
exports.initReview = initReview;
