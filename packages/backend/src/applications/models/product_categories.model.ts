import {
    DataType,
    Column,
    PrimaryKey,
    Default,
    Model,
    Table,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Tenants from "./tenants.model";

@Table({
    tableName: "product_categories",
    timestamps: false
})
class ProductCategories extends Model {
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

    @Column(DataType.STRING)
    icon!: string;

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

export default ProductCategories;