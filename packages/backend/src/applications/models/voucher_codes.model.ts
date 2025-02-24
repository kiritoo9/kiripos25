import {
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    Column,
    Default,
    Unique
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Vouchers from "./vouchers.model";

@Table({
    tableName: "voucher_codes",
    timestamps: false
})
class VoucherCodes extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Vouchers)
    @Column(DataType.UUID)
    voucher_id!: string;

    @Unique(true)
    @Column(DataType.STRING)
    code!: string;

    @Column(DataType.STRING)
    remark!: string;

    // define an association
    @BelongsTo(() => Vouchers, { onDelete: "CASCADE" })
    voucher?: Vouchers;
}

export default VoucherCodes;