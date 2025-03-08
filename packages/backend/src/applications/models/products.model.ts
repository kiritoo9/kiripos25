import {
    DataType,
    Table,
    ForeignKey,
    PrimaryKey,
    BelongsTo,
    Column,
    Default,
    Model,
    Comment,
    Unique
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import ProductCategories from "./product_categories.model";
import Tenants from "./tenants.model";

@Table({
    tableName: "products",
    timestamps: false
})
class Products extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Tenants)
    @Column(DataType.UUID)
    tenant_id!: string;

    @ForeignKey(() => ProductCategories)
    @Column(DataType.UUID)
    category_id!: string;

    @Unique
    @Column(DataType.STRING)
    code!: string;

    @Column(DataType.STRING)
    name!: string;

    @Default(0)
    @Column(DataType.DECIMAL)
    capital_price!: number;

    @Default(0)
    @Column(DataType.DECIMAL)
    sell_price!: number;

    @Column(DataType.STRING)
    description!: string;

    @Column(DataType.JSONB)
    details!: string;

    @Column(DataType.JSONB)
    images!: string;

    @Default("S1")
    @Comment('S1=draft,S2=publish,S3=discontinue')
    @Column(DataType.STRING)
    status!: string;

    @Column(DataType.JSONB)
    tags!: string;

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

    @BelongsTo(() => ProductCategories, { onDelete: "CASCADE" })
    category?: ProductCategories;
}

export default Products;