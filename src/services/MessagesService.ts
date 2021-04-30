import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
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

        const message = this.messagesRepository.create({
            sender_id,
            receiver_id,
            text,
        });

    }

}
