import {
    DataType,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    Default,
    Comment,
    Model,
    Table,
    Column
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Products from "./products.model";
import Tenants from "./tenants.model";

@Table({
    tableName: "stock_movements",
    timestamps: false
})
class StockMovements extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Tenants)
    @Column(DataType.UUID)
    tenant_id!: string;

    @ForeignKey(() => Products)
    @Column(DataType.UUID)
    product_id!: string;

    @Default(null)
    @Column(DataType.UUID)
    reff_id!: string;

    @Default(0)
    @Column(DataType.INTEGER)
    change_qty!: number;

    @Default("M1")
    @Comment("M1=purchase,M2=sale,M3=return,M4=adjustment'")
    @Column(DataType.STRING)
    movement_type!: string;

    @Default(new Date())
    @Column(DataType.DATE)
    movement_date!: Date;

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

    // define an association
    @BelongsTo(() => Tenants, { onDelete: "CASCADE" })
    tenant?: Tenants;

    @BelongsTo(() => Products, { onDelete: "CASCADE" })
    product?: Products;
}

export default StockMovements;