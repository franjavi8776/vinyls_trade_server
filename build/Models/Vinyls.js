"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vinyl = exports.initVinylModel = void 0;
const sequelize_1 = require("sequelize");
class Vinyl extends sequelize_1.Model {
    constructor(values, options) {
        super(values, options);
        if (values.stock) {
            this.stock = values.stock;
        }
        else if (!values.stock) {
            this.stock = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        }
        if (values.price) {
            this.price = values.price;
        }
        else if (!values.price) {
            this.price = Math.floor(Math.random() * (70 - 20 + 1)) + 20;
        }
    }
}
exports.Vinyl = Vinyl;
const initVinylModel = (sequelize) => {
    Vinyl.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        idApi: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        genre: {
            type: sequelize_1.DataTypes.STRING,
        },
        cover_image: {
            type: sequelize_1.DataTypes.STRING,
        },
        style: {
            type: sequelize_1.DataTypes.STRING,
        },
        stock: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        price: {
            type: sequelize_1.DataTypes.INTEGER,
        },
        artists: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true
        },
        videos: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true
        },
        tracklist: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true
        },
        resource_url: {
            type: sequelize_1.DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'Vinyl',
        timestamps: true,
        paranoid: true,
    });
};
exports.initVinylModel = initVinylModel;
