import {
    DataType,
    Table,
    PrimaryKey,
    Column,
    Model,
    Default
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
    tableName: "tables",
    timestamps: false
})
class Tables extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @Column(DataType.STRING)
    table_no!: string;

    @Column(DataType.NUMBER)
    max_person!: number;

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

export default Tables;