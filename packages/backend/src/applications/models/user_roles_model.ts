import {
    Table,
    Model,
    Column,
    ForeignKey,
    PrimaryKey,
    Default,
    DataType,
    BelongsTo
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Users from "./users.model";
import Roles from "./roles.model";

@Table({
    tableName: "user_roles",
    timestamps: false
})
class UserRoles extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Users)
    @Column(DataType.UUID)
    user_id!: string;

    @ForeignKey(() => Roles)
    @Column(DataType.UUID)
    role_id!: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    deleted?: boolean;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at!: Date;

    @Column(DataType.DATE)
    updated_at!: Date;

    // define an association
    @BelongsTo(() => Users, { onDelete: "CASCADE" })
    users?: Users;

    @BelongsTo(() => Roles, { onDelete: "CASCADE" })
    roles?: Roles;
}

export default UserRoles;