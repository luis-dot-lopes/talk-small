import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { MessagesRepository } from "../repositories/MessagesRepository";

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

        const message = await this.messagesRepository.create({
            sender_id,
            receiver_id,
            text,
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
            sent_messages.push({ 
                text: message.text,
                created_at: message.created_at,
                receiver_name,
            })
        }
        
        const received_messages_raw = await this.messagesRepository.find({
            where: { receiver_id: user_id },
            relations: [ "sender" ],
        });

        const received_messages = [];

        for(let message of received_messages_raw) {
            const sender_name = message.sender.username;
            received_messages.push({ 
                text: message.text,
                created_at: message.created_at,
                sender_name,
            })
        }

        const messages = { sent_messages, received_messages };

        console.log(messages);

        return messages;
        
    }

}

export { MessagesService };
