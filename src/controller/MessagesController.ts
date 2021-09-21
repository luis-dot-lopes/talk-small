import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";
import { UsersController } from "./UsersController";

interface ICreateMessage {
    session_id: string;
    receiver_id: string;
    text: string;
}

class MessagesController {
    
    async createFromReq(req: Request, res: Response) {
        /**
         * Takes a request and creates a message storing it in the database
         * and responds with json representation of the message
         * Test only method
         */

        const { session_id, receiver_id, text } = req.body;

        const messagesService = new MessagesService();
        const usersService = new UsersService();

        const senderLogged = UsersController.active_sessions[session_id];
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
            return res.json({ error: "Sender or receiver doesn't exist" });
        }

    }

    async create({session_id, receiver_id, text} : ICreateMessage) {
        /**
         * Takes object representing a message and saves it to the database
         */

        //Init services
        const messagesService = new MessagesService();
        const usersService = new UsersService();

        const senderLogged = UsersController.active_sessions[session_id];
        const receiverExists = await usersService.findByID(receiver_id);

        //Checks if both sender is alredy logged and receiver exists in the database
        if(senderLogged && receiverExists) {
            //Creates a message in the database and returns the object created
            const message = await messagesService.create({
                sender_id: senderLogged,
                receiver_id,
                text,
            });

            return message;
        } else {
            return { error: "Sender or receiver doesn't exist" };
        }

    }

    async listByUser(req: Request, res: Response) {
        
        const { user_id } = req.body;

        const real_id = UsersController.active_sessions[user_id];

        const messagesService = new MessagesService();

        const messages = await messagesService.listByUser(real_id);
        
        return res.json(messages);

    }

    async listByTalk(req: Request, res: Response) {
        
        const { talk_id } = req.body;

        const messagesService = new MessagesService();

        const messages = await messagesService.listByTalk(talk_id);

        return res.json(messages);

    }
}

export { MessagesController };
