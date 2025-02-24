import {
    Column,
    Model,
    Table,
    DataType,
    ForeignKey,
    BelongsTo,
    Default,
    PrimaryKey
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Users from "./users.model";

@Table({
    tableName: "logs",
    timestamps: false
})
class Logs extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Users)
    @Column(DataType.UUID)
    user_id!: string;

    @Column(DataType.UUID)
    reff_id!: string;

    @Column(DataType.STRING)
    reff_table!: string;

    @Column(DataType.STRING)
    url_path!: string;

    @Column(DataType.STRING)
    ip_address!: string;

    @Column(DataType.STRING)
    user_action!: string;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at!: Date;

    // define an association
    @BelongsTo(() => Users, { onDelete: "CASCADE" })
    user?: Users;
}

export default Logs;