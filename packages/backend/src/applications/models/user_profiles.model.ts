import {
    Model,
    Column,
    Table,
    DataType,
    Default,
    PrimaryKey,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Users from "./users.model";

@Table({
    tableName: "user_profiles",
    timestamps: false
})
class UserProfiles extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Users)
    @Column(DataType.UUID)
    user_id!: string;

    @Column(DataType.STRING)
    fullname!: string;

    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    phone!: string;

    @Column(DataType.STRING)
    address!: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    deleted!: boolean;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at?: Date;

    @Column(DataType.DATE)
    updated_at?: Date;

    // define an association
    @BelongsTo(() => Users, { onDelete: "CASCADE" })
    user?: Users;
}

export default UserProfiles;