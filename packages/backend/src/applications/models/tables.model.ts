import {
    DataType,
    Table,
    PrimaryKey,
    Column,
    Model,
    Default,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Tenants from "./tenants.model";

@Table({
    tableName: "tables",
    timestamps: false
})
class Tables extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Tenants)
    @Column(DataType.UUID)
    tenant_id!: string;

    @Column(DataType.STRING)
    table_no!: string;

    @Column(DataType.INTEGER)
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

    // define associations
    @BelongsTo(() => Tenants, { onDelete: "CASCADE" })
    tenant?: Tenants;
}

export default Tables;