import { Model, DataTypes, Sequelize, UUIDV4 } from "sequelize";

import { UUID } from "crypto";

class MercadoPago extends Model {
  public id!: UUID;
  public idMP!: number;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public status!: string;
  public statusDetail?: string;
  public amount?: number;
}

const initMercadopagoModel = (sequelize: Sequelize) => {
  MercadoPago.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      idMP: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      statusDetail: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Mercadopago",
      timestamps: false,
    }
  );
};

export { initMercadopagoModel, MercadoPago };
