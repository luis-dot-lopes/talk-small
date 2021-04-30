import { Router } from "express";
import { MessagesController } from "./controller/MessagesController";
import { UsersController } from "./controller/UsersController";

const router = Router();

const usersController = new UsersController();
const messagesController = new MessagesController();

router.get("/", (req, res) => {
    res.render("index.html");
});

router.post("/signup", usersController.create);
router.post("/login", usersController.loginIn);
router.post("/send", messagesController.create);

export { router };
