import {
    Table,
    DataType,
    Column,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    Model,
    Default
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Purchases from "./purchases.model";
import Products from "./products.model";

@Table({
    tableName: "purchase_items",
    timestamps: false
})
class PurchaseItems extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Purchases)
    @Column(DataType.UUID)
    purchase_id!: string;

    @ForeignKey(() => Products)
    @Column(DataType.UUID)
    product_id!: string;

    @Default(0)
    @Column(DataType.INTEGER)
    qty!: number;

    @Default(0)
    @Column(DataType.DECIMAL)
    price!: number;

    // define an associate
    @BelongsTo(() => Purchases, { onDelete: "CASCADE" })
    purchase?: Purchases;

    @BelongsTo(() => Products, { onDelete: "CASCADE" })
    product?: Products;
}

export default PurchaseItems;