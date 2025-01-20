import {
    Model,
    Table,
    PrimaryKey,
    ForeignKey,
    Column,
    DataType,
    Default,
    BelongsTo
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Roles from "./roles.model";
import Menus from "./menus.model";

@Table({
    tableName: "role_menus",
    timestamps: false
})
class RoleMenus extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Roles)
    @Column(DataType.UUID)
    role_id!: string;

    @ForeignKey(() => Menus)
    @Column(DataType.UUID)
    menu_id!: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    act_view?: boolean;

    @Default(false)
    @Column(DataType.BOOLEAN)
    act_detail?: boolean;

    @Default(false)
    @Column(DataType.BOOLEAN)
    act_create?: boolean;

    @Default(false)
    @Column(DataType.BOOLEAN)
    act_update?: boolean;

    @Default(false)
    @Column(DataType.BOOLEAN)
    act_delete?: boolean;

    @Default(false)
    @Column(DataType.BOOLEAN)
    deleted?: boolean;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at?: Date;

    @Column(DataType.DATE)
    updated_at?: Date;

    // define an association
    @BelongsTo(() => Roles, { onDelete: "CASCADE" })
    role?: Roles;

    @BelongsTo(() => Menus, { onDelete: "CASCADE" })
    menu?: Menus;
}

export default RoleMenus;