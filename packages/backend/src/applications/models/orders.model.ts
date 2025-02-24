import {
    Table,
    Column,
    Default,
    DataType,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    Unique,
    Comment
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Users from "./users.model";

@Table({
    tableName: "orders",
    timestamps: false
})
class Orders extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Users)
    @Column(DataType.UUID)
    user_id!: string;

    @Default(null)
    @Column(DataType.UUID)
    table_id!: string;

    @Unique(true)
    @Column(DataType.STRING)
    order_no!: string;

    @Default(new Date())
    @Column(DataType.DATE)
    order_date!: Date;

    @Default(0)
    @Column(DataType.INTEGER)
    order_qty!: number;

    @Default(0)
    @Column(DataType.DECIMAL)
    order_price!: number;

    @Column(DataType.STRING)
    remark!: string;

    @Column(DataType.STRING)
    pic_name!: string;

    @Default("S1")
    @Comment("S1=pending,S2=paid,S3=canceled")
    @Column(DataType.STRING)
    status!: string;

    @Default(0)
    @Column(DataType.DECIMAL)
    discount_amount!: number;

    @Default(0)
    @Column(DataType.INTEGER)
    discount_percentage!: number;

    @Default(false)
    @Column(DataType.BOOLEAN)
    deleted!: boolean;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at!: Date;

    @Column(DataType.DATE)
    updated_at!: Date;

    // define an association
    @BelongsTo(() => Users, { onDelete: "CASCADE" })
    user?: Users;
}

export default Orders;