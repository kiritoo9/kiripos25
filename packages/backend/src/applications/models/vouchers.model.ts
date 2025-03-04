import {
    DataType,
    Model,
    PrimaryKey,
    Table,
    Column,
    Default,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Tenants from "./tenants.model";

@Table({
    tableName: "vouchers",
    timestamps: false
})
class Vouchers extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Tenants)
    tenant_id!: string;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    description!: string;

    @Default(0)
    @Column(DataType.DECIMAL)
    amount!: number;

    @Default(0)
    @Column(DataType.DECIMAL)
    percentage!: number;

    @Column(DataType.DATE)
    start_date!: Date;

    @Column(DataType.DATE)
    end_date!: Date;

    @Default(false)
    @Column(DataType.BOOLEAN)
    is_publish!: boolean;

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

export default Vouchers;