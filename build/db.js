"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const Order_1 = require("./Models/Order");
const Users_1 = require("./Models/Users");
const Vinyls_1 = require("./Models/Vinyls");
const orderDetail_1 = require("./Models/orderDetail");
const Reviews_1 = require("./Models/Reviews");
dotenv_1.default.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
//const DB_DEPLOY = process.env.DB_DEPLOY;
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    logging: false,
    native: false,
});
exports.sequelize = sequelize;
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   {
//     logging: false,
//     native: false,
//   }
// );
// const sequelize = new Sequelize(`${DB_DEPLOY}`, {
//   logging: false,
//   native: false,
// });
(0, Order_1.initOrderModel)(sequelize);
(0, Users_1.initUsersModel)(sequelize);
(0, Vinyls_1.initVinylModel)(sequelize);
(0, orderDetail_1.initOrderDetail)(sequelize);
(0, Reviews_1.initReview)(sequelize);
// * Relaciones
const UserVinyls = sequelize.define("UserVinyls", {});
Users_1.Users.belongsToMany(Vinyls_1.Vinyl, { through: UserVinyls });
Vinyls_1.Vinyl.belongsToMany(Users_1.Users, { through: UserVinyls });
Users_1.Users.hasOne(Order_1.Order, { foreignKey: "id" });
Order_1.Order.hasOne(Users_1.Users, { foreignKey: "id" });
Users_1.Users.hasOne(Users_1.Users, { foreignKey: "id" });
Order_1.Order.hasMany(orderDetail_1.OrderDetail, {
    sourceKey: "id",
    foreignKey: "id",
});
orderDetail_1.OrderDetail.belongsTo(Order_1.Order, {
    foreignKey: "id",
});
