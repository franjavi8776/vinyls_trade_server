import { Model, DataTypes, ForeignKey, Sequelize } from "sequelize";

class Order extends Model {
  declare id: string;
  declare userId: ForeignKey<number>;
  declare userEmail: string;
  declare detail: object[];
  declare tax: number | null;
  declare total: number;
  declare state: string;
}

const initOrderModel = (sequelize: Sequelize) => {
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userEmail: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      tax: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "orders",
      sequelize,
      timestamps: false,
    }
  );
};

export { initOrderModel, Order };
