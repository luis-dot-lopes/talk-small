
import { http } from "./http";
import "./sockets/user";

http.listen(3001, () => {
    console.log(`Server running on localhost:3001`);
})
