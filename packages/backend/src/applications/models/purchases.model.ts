import {
    DataType,
    Table,
    Column,
    Default,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    Comment,
    Model
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Users from "./users.model";

@Table({
    tableName: "purchases",
    timestamps: false
})
class Purchases extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Users)
    @Column(DataType.UUID)
    user_id!: string;

    @Column(DataType.STRING)
    purchase_no!: string;

    @Default(new Date())
    @Column(DataType.DATE)
    purchase_date!: Date;

    @Default(0)
    @Column(DataType.INTEGER)
    total_qty!: number;

    @Default(0)
    @Column(DataType.DECIMAL)
    total_price!: number;

    @Column(DataType.STRING)
    remark!: string;

    @Column(DataType.STRING)
    pic_name!: string;

    @Default("S1")
    @Comment("S1=draft,S2=approved,S3=rejected")
    @Column(DataType.STRING)
    status!: string;

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

export default Purchases;