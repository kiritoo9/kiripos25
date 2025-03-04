import {
    DataType,
    Column,
    Table,
    ForeignKey,
    PrimaryKey,
    Model,
    BelongsTo,
    Default
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Users from "./users.model";
import Tenants from "./tenants.model";

@Table({
    tableName: "user_tenants",
    timestamps: false
})
class UserTenants extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Users)
    @Column(DataType.UUID)
    user_id!: string;

    @ForeignKey(() => Tenants)
    @Column(DataType.UUID)
    tenant_id!: string;

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

    @BelongsTo(() => Tenants, { onDelete: "CASCADE" })
    tenant?: Tenants;
}

export default UserTenants;