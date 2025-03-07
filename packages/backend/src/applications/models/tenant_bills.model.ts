import {
    Model,
    Table,
    Column,
    DataType,
    Default,
    PrimaryKey,
    Unique,
    Comment,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
import Packages from "./packages.model";
import Tenants from "./tenants.model";

@Table({
    tableName: "tenant_bills",
    timestamps: false
})
class TenantBills extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Packages)
    @Column(DataType.UUID)
    package_id!: string;

    @ForeignKey(() => Tenants)
    @Column(DataType.UUID)
    tenant_id!: string;

    @Default(0)
    @Column(DataType.INTEGER)
    price!: number;

    @Default(0)
    @Column(DataType.INTEGER)
    total_month!: number;

    @Default(0)
    @Column(DataType.INTEGER)
    total_price!: number;

    @Column(DataType.DATE)
    start_date!: Date;

    @Column(DataType.DATE)
    end_date!: Date;

    @Column(DataType.DATE)
    bill_date!: Date;

    @Comment("S1=pending,S2=paid,S3=expired")
    @Column(DataType.STRING)
    status!: string;

    @Column(DataType.STRING)
    remark?: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    deleted!: boolean;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at?: Date;

    @Column(DataType.DATE)
    updated_at?: Date;

    // define associations
    @BelongsTo(() => Packages, { onDelete: "CASCADE" })
    package?: Packages;

    @BelongsTo(() => Tenants, { onDelete: "CASCADE" })
    tenant?: Tenants;
}

export default TenantBills;