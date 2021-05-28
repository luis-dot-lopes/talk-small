
import { io } from "../http";

io.on("connect", socket => {
    console.log("connected");
    socket.on("message", message => {
        console.log(message);
    });
});
