import {
    Table,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    Default,
    Column,
    DataType
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Orders from "./orders.model";
import Products from "./products.model";

@Table({
    tableName: "order_items",
    timestamps: false
})
class OrderItems extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Orders)
    @Column(DataType.UUID)
    order_id!: string;

    @ForeignKey(() => Products)
    @Column(DataType.UUID)
    product_id!: string;

    @Default(0)
    @Column(DataType.INTEGER)
    qty!: number;

    @Default(0)
    @Column(DataType.DECIMAL)
    price!: number;

    @Default(false)
    @Column(DataType.BOOLEAN)
    deleted!: boolean;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at!: Date;

    @Column(DataType.DATE)
    updated_at!: Date;

    @BelongsTo(() => Orders, { onDelete: "CASCADE" })
    order?: Orders;

    @BelongsTo(() => Products, { onDelete: "CASCADE" })
    product?: Products;
}

export default OrderItems;