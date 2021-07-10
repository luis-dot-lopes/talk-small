import {Column, MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class MessageRefactoring1625879108742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.addColumn("messages",
            new TableColumn({
                name: "talk_id",
                type: "uuid",
            })
        );
        queryRunner.createForeignKey("messages", 
            new TableForeignKey({
                name: "FKTalk",
                referencedTableName: "talks",
                referencedColumnNames: ["id"],
                columnNames: ["talk_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropForeignKey("messages", "FKTalk");
        queryRunner.dropColumn("messages", "talk_id");
    }

}
