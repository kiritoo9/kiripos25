import {
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
    tableName: "customers",
    timestamps: false
})
class Customers extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    phone!: string;

    @Column(DataType.STRING)
    address!: string;

    @Column(DataType.STRING)
    gender!: string;

    @Column(DataType.STRING)
    range_of_age!: string;

    @Column(DataType.STRING)
    remark!: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    deleted!: boolean;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at!: Date;

    @Column(DataType.DATE)
    updated_at!: Date;
}

export default Customers;