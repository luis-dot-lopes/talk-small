
import { MessagesController } from "../controller/MessagesController";
import { UsersController } from "../controller/UsersController";
import { Message } from "../entities/Message";
import { io } from "../http";
import { UsersService } from "../services/UsersService";

const messagesController = new MessagesController();
const sockets = [];

io.on("connect", socket => {
    console.log("connected");
    socket.on("loggedIn", ({ user_id }) => { 
        sockets[user_id] = socket;
    });
    socket.on("message", async (message, fn) => {
        const new_message = await messagesController.create(message);
        const isMessage = (obj: Message | { error: string }): obj is Message => true;
        if(isMessage(new_message)) {
            const { sender_id, receiver_id, created_at, text } = new_message;
            const usersService = new UsersService();
            const receiver_name = (await usersService.findByID(receiver_id)).username;
            const sender_name = (await usersService.findByID(sender_id)).username;
            const receiver_socket = sockets[receiver_id];
            fn({
                sent_messages : [
                    {
                        text,
                        created_at,
                        contact_id: receiver_id,
                        receiver_name,
                    }
                ],
                received_messages : [],
            });
            receiver_socket.emit("message-received", {
                received_messages : [
                    {
                        text,
                        created_at,
                        contact_id: sender_id,
                        sender_name,
                    }
                ],
                sent_messages: [],
            });
        }
    });
});
