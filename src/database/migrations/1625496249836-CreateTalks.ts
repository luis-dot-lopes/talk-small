import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTalks1625496249836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "talks",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "user_id1",
                        type: "uuid",
                    },
                    {
                        name: "user_id2",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUser1",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id1"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKUser2",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id2"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("talks");
    }

}
