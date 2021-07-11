import {Column, getCustomRepository, MigrationInterface, QueryRunner, Repository, TableColumn, TableForeignKey} from "typeorm";
import { Message } from "../../entities/Message";
import { MessagesRepository } from "../../repositories/MessagesRepository";
import { TalksService } from "../../services/TalksService";

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

        const messagesRepository: Repository<Message> = getCustomRepository(MessagesRepository);
        const talksService = new TalksService();
        const allMessages = await messagesRepository.find({
            select: ["sender_id", "receiver_id", "id"]
        });

        for(let { sender_id, receiver_id, id } of allMessages) {
            const talk = await talksService.create({
                user_id1: sender_id, 
                user_id2: receiver_id,
            });

            await messagesRepository.update({ id }, {talk_id: talk.id });
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("messages", "FKTalk");
        await queryRunner.dropColumn("messages", "talk_id");
        await queryRunner.clearTable("talks");
    }

}
