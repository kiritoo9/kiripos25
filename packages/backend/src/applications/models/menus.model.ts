import {
    Model,
    Table,
    DataType,
    Default,
    Column,
    PrimaryKey
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
    tableName: "menus",
    timestamps: false
})
class Menus extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @Default(null)
    @Column(DataType.UUID)
    parent_id?: string;

    @Column(DataType.STRING)
    label!: string;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    url!: string;

    @Default(null)
    @Column(DataType.STRING)
    icon?: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    deleted?: boolean;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at?: Date;

    @Default(new Date())
    @Column(DataType.DATE)
    updated_at?: Date;
}

export default Menus;