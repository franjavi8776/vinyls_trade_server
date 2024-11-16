"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPago = exports.initMercadopagoModel = void 0;
const sequelize_1 = require("sequelize");
class MercadoPago extends sequelize_1.Model {
}
exports.MercadoPago = MercadoPago;
const initMercadopagoModel = (sequelize) => {
    MercadoPago.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            defaultValue: sequelize_1.UUIDV4,
        },
        idMP: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        statusDetail: {
            type: sequelize_1.DataTypes.STRING,
        },
        amount: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Mercadopago",
        timestamps: false,
    });
};
exports.initMercadopagoModel = initMercadopagoModel;
