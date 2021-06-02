
import { http } from "./http";
import "./sockets/user";

http.listen(3000, () => {
    console.log(`Server running on localhost:3000`);
})
