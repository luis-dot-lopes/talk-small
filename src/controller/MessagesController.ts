import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";
import { UsersController } from "./UsersController";

class MessagesController {
    async create(req: Request, res: Response) {

        const { session_id, receiver_id, text } = req.body;

        const messagesService = new MessagesService();
        const usersService = new UsersService();

        const senderLogged = UsersController.active_sessions.find(session => session.id === session_id);
        const receiverExists = await usersService.findByID(receiver_id);

        const senderExists = senderLogged ? senderLogged.user_id : undefined;

        if(senderExists && receiverExists) {
            const message = await messagesService.create({
                sender_id: senderExists,
                receiver_id,
                text,
            });

            return res.json(message);
        } else {
            return res.json({ message: "Sender or receiver doesn't exist" });
        }

    }

    async listByUser(req: Request, res: Response) {
        
        console.log(req.body);

        const { user_id } = req.body;

        const real_id = UsersController.active_sessions.find(session => session.id == user_id).user_id;

        const messagesService = new MessagesService();

        const messages = await messagesService.listByUser(real_id);
        
        return res.json(messages);

    }
}

export { MessagesController };
