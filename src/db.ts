import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { initOrderModel, Order } from "./Models/Order";
import { initUsersModel, Users } from "./Models/Users";
import { initVinylModel, Vinyl } from "./Models/Vinyls";
import { initOrderDetail, OrderDetail } from "./Models/orderDetail";
import { initReview } from "./Models/Reviews";

dotenv.config();
const DB_USER = process.env.DB_USER!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_HOST = process.env.DB_HOST!;
const DB_NAME = process.env.DB_NAME!;

//const DB_DEPLOY = process.env.DB_DEPLOY;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
  native: false,
});

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

initOrderModel(sequelize);
initUsersModel(sequelize);
initVinylModel(sequelize);
initOrderDetail(sequelize);
initReview(sequelize);

// * Relaciones
const UserVinyls = sequelize.define("UserVinyls", {});

Users.belongsToMany(Vinyl, { through: UserVinyls });
Vinyl.belongsToMany(Users, { through: UserVinyls });

Users.hasOne(Order, { foreignKey: "id" });
Order.hasOne(Users, { foreignKey: "id" });

Users.hasOne(Users, { foreignKey: "id" });
Order.hasMany(OrderDetail, {
  sourceKey: "id",
  foreignKey: "id",
});
OrderDetail.belongsTo(Order, {
  foreignKey: "id",
});

export { sequelize };
