import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1619657781235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "messages",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "sender_id",
                        type: "uuid",
                    },
                    {
                        name: "receiver_id",
                        type: "uuid",
                    },
                    {
                        name: "text",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKSender",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["sender_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKReceiver",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["receiver_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("messages");
    }

}
