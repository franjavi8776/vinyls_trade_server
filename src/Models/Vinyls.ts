import { Model, DataTypes, Sequelize } from "sequelize";

import { UUID } from "crypto";

class Vinyl extends Model {
    public id!: UUID;
    public idApi?: number;
    public title!: string;
    public artist!: string; 
    public year!: number;
    public genre!: string;
    public cover_image!: string;
    public style!: string;
    public stock!: number;
    public price!: number;
    public artists!: string | string[] | null; 
    public videos!: string | any[] | null; 
    public tracklist!: string | any[] | null;
    public readonly updatedAt!: Date;

    constructor(values?: any, options?: any) {
        super(values, options);
        if (values.stock){
            this.stock = values.stock;
        } else if (!values.stock){
            this.stock = Math.floor(Math.random() * (20 - 1 + 1)) + 1; 
            
        }

        if (values.price){
            this.price = values.price;
        } else if (!values.price){
            this.price = Math.floor(Math.random() * (70 - 20 + 1)) + 20; 

        }
    }
}

const initVinylModel = (sequelize: Sequelize) => {
    Vinyl.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            idApi: {
                type: DataTypes.INTEGER,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
            },
            genre: {
                type: DataTypes.STRING,
            },
            cover_image: {
                type: DataTypes.STRING,
            },
            style: {
                type: DataTypes.STRING,
            },
            stock: {
                type: DataTypes.INTEGER,
            },
            price: {
                type: DataTypes.INTEGER,
            },
            artists: {
                type: DataTypes.JSON,
                allowNull: true
            },
            videos: {
                type: DataTypes.JSON,
                allowNull: true 
            },
            tracklist: {
                type: DataTypes.JSON, 
                allowNull: true
            },
            resource_url:{
                type: DataTypes.STRING
            }
        },
    {
        sequelize,
        tableName: 'Vinyl',
        timestamps: true,
        paranoid: true,
    }
    )
}
    export {initVinylModel, Vinyl};
