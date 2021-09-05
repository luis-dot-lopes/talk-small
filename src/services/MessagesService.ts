import { getCustomRepository, LessThanOrEqual, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { TalksService } from "./TalksService";

interface ICreateMessage {
    sender_id: string;
    receiver_id: string;
    text: string;
}

class MessagesService {

    private messagesRepository: Repository<Message>;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({ sender_id, receiver_id, text } : ICreateMessage) {

        const talksService = new TalksService();
        const talk_id = (await talksService.create({ user_id1: sender_id, user_id2: receiver_id })).id;

        const message = await this.messagesRepository.create({
            sender_id,
            receiver_id,
            text,
            talk_id,
        });

        await this.messagesRepository.save(message);

        return message;

    }

    async listByUser(user_id: string) {

        const sent_messages_raw = await this.messagesRepository.find({
            where: { sender_id: user_id },
            relations: [ "receiver" ],
        });

        const sent_messages = [];

        for(let message of sent_messages_raw) {
            const receiver_name = message.receiver.username;
            const contact_id = message.receiver.id;
            sent_messages.push({ 
                text: message.text,
                created_at: message.created_at,
                receiver_name,
                contact_id,
            })
        }
        
        const received_messages_raw = await this.messagesRepository.find({
            where: { receiver_id: user_id },
            relations: [ "sender" ],
        });

        const received_messages = [];

        for(let message of received_messages_raw) {
            const sender_name = message.sender.username;
            const contact_id = message.sender.id;
            received_messages.push({ 
                text: message.text,
                created_at: message.created_at,
                sender_name,
                contact_id,
            })
        }

        const messages = { sent_messages, received_messages };

        return messages;
        
    }

    async listByTalk(talk_id: string) {

        const messages = await this.messagesRepository.find({ talk_id });

        return messages;
    }

    //Function to list n messages created before a given date, using a talk_id
    async takeNBeforeDateByTalk(talk_id: string, n: number, date: Date) {
        const messages = await this.messagesRepository.find({
            order: { created_at: "DESC" },
            where: { talk_id, created_at: LessThanOrEqual(date) },
            take: n,
        });
    }

}

export { MessagesService };
