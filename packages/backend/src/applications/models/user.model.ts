import {
    Model,
    Column,
    Table,
    DataType,
    Default,
    PrimaryKey
} from "sequelize-typescript";

import { v4 as uuidv4 } from 'uuid';

@Table({ 
    tableName: "users" ,
    timestamps: false
})
class User extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id?: string;

    @Column(DataType.STRING)
    username!: string;

    @Column(DataType.STRING)
    password!: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    deleted?: boolean

    @Default(new Date())
    @Column(DataType.DATE)
    created_at?: Date

    @Default(new Date())
    @Column(DataType.DATE)
    updated_at?: Date
}

export default User