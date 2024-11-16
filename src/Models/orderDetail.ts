import { DataTypes, Model, Sequelize } from "sequelize";

class OrderDetail extends Model {
  public id!: string;
  public name!: string;
  public vinylId!: string;
  public units?: number;
  public amount?: number;
  public taxAmount?: number;
  public totalAmount?: number;
  public orderStatus!: string;
  public updated!: Date;
}

const initOrderDetail = (sequelize: Sequelize) => {
  OrderDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    vinylId: {
      type: DataTypes.UUID,
      defaultValue: 'a0abaee7-9e97-425f-b3dd-d4fecdd155ad'
    },
    units: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    taxAmount: {
      type: DataTypes.FLOAT,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
    },
    orderStatus: {
      type: DataTypes.STRING(6),
      defaultValue: "Cart",
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "OrderDetail",
    paranoid: true,
  }
);
}
export {initOrderDetail, OrderDetail};
