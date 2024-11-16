import { DataTypes, Model, Sequelize } from "sequelize";

class Users extends Model {
  public id!: string;
  public name!: string;
  public email?: string;
  public password?: string;
  public codArea?: string;
  public phoneNumber?: string;
  public city?: string;
  public country?: string;
  public isAdmin!: boolean;
  public isDeleted!: boolean | null;
  public deletedAt!: Date | null;
  public createdAt!: Date | null;
  public updatedAt!: Date | null;
}

const initUsersModel = (sequelize: Sequelize) => {
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      codArea: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      modelName: "Users",
      timestamps: true,
      paranoid: true,
    }
  );
};

export { initUsersModel, Users };
