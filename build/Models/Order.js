"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.initOrderModel = void 0;
const sequelize_1 = require("sequelize");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
const initOrderModel = (sequelize) => {
    Order.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        userEmail: {
            type: sequelize_1.DataTypes.STRING,
        },
        detail: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false,
        },
        tax: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: true,
        },
        total: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "orders",
        sequelize,
        timestamps: false,
    });
};
exports.initOrderModel = initOrderModel;
