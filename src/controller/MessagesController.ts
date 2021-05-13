import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";

class MessagesController {
    async create(req: Request, res: Response) {
        const { sender_id, receiver_id, text } = req.body;

        const messagesService = new MessagesService();
        const usersService = new UsersService();

        const senderExists = await usersService.findByID(sender_id);
        const receiverExists = await usersService.findByID(receiver_id);

        if(senderExists && receiverExists) {
            const message = await messagesService.create({
                sender_id,
                receiver_id,
                text,
            });

            return res.json(message);
        } else {
            return res.json({ message: "Sender or receiver doesn't exist" });
        }

    }

    async listByUser(req: Request, res: Response) {
        
        const { user_id } = req.body;
        const messagesService = new MessagesService();

        const messages = await messagesService.listByUser(user_id);
        
        return res.json(messages);

    }
}

export { MessagesController };
