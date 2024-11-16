"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.initUsersModel = void 0;
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
}
exports.Users = Users;
const initUsersModel = (sequelize) => {
    Users.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
        },
        codArea: {
            type: sequelize_1.DataTypes.STRING,
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
        },
        country: {
            type: sequelize_1.DataTypes.STRING,
        },
        isAdmin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isDeleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        deletedAt: {
            type: sequelize_1.DataTypes.DATE
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
        }
    }, {
        sequelize,
        modelName: "Users",
        timestamps: true,
        paranoid: true,
    });
};
exports.initUsersModel = initUsersModel;
