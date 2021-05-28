
import { MessagesController } from "../controller/MessagesController";
import { io } from "../http";

const messagesController = new MessagesController();

io.on("connect", socket => {
    console.log("connected");
    socket.on("message", async message => {
        console.log(await messagesController.create(message));
    });
});
