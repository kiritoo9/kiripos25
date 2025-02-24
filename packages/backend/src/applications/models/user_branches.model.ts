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
import Branches from "./branches.model";

@Table({
    tableName: "user_branches",
    timestamps: false
})
class UserBranches extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @ForeignKey(() => Users)
    @Column(DataType.UUID)
    user_id!: string;

    @ForeignKey(() => Branches)
    @Column(DataType.UUID)
    branch_id!: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    branch_head!: boolean;

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

    @BelongsTo(() => Branches, { onDelete: "CASCADE" })
    branch?: Branches;
}

export default UserBranches;