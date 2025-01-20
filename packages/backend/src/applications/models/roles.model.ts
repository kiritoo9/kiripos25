import {
    Model,
    Table,
    Column,
    DataType,
    Default,
    PrimaryKey,
    Unique
} from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';

@Table({
    tableName: "roles",
    timestamps: false
})
class Roles extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @Unique(true)
    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    description?: string;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at?: Date;

    @Column(DataType.DATE)
    updated_at?: Date;
}

export default Roles;