import {
    Model,
    Table,
    Column,
    DataType,
    Default,
    PrimaryKey,
    Unique,
    Comment
} from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';

@Table({
    tableName: "tenants",
    timestamps: false
})
class Tenants extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @Unique(true)
    @Column(DataType.STRING)
    code!: string;

    @Unique(true)
    @Column(DataType.STRING)
    name!: string;

    @Unique(true)
    @Column(DataType.STRING)
    slug!: string;

    @Column(DataType.STRING)
    tagline?: string;

    @Column(DataType.STRING)
    description?: string;

    @Column(DataType.STRING)
    remark?: string;

    @Comment("S1=pending,S2=active,S3=not-active")
    @Column(DataType.STRING)
    status?: string;

    @Column(DataType.STRING)
    photo?: string;

    @Column(DataType.STRING)
    banner?: string;

    @Default(new Date())
    @Column(DataType.DATE)
    created_at?: Date;

    @Column(DataType.DATE)
    updated_at?: Date;
}

export default Tenants;