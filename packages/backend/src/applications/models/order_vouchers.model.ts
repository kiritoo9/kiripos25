import {
    DataType,
    Table,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    Default,
    Column,
    Model
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Orders from "./orders.model";
import Vouchers from "./vouchers.model";

@Table({
    tableName: "order_vouchers",
    timestamps: false
})
class OrderVouchers extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Orders)
    @Column(DataType.UUID)
    order_id!: string;

    @ForeignKey(() => Vouchers)
    @Column(DataType.UUID)
    voucher_id!: string;

    @Column(DataType.STRING)
    voucher_code!: string;

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
    @BelongsTo(() => Orders, { onDelete: "CASCADE" })
    order?: Orders;

    @BelongsTo(() => Vouchers, { onDelete: "CASCADE" })
    voucher?: Vouchers;
}

export default OrderVouchers;