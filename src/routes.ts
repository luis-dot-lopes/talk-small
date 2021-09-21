import { Router } from "express";
import { MessagesController } from "./controller/MessagesController";
import { TalksController } from "./controller/TalksController";
import { UsersController } from "./controller/UsersController";

const router = Router();

const usersController = new UsersController();
const messagesController = new MessagesController();
const talksController = new TalksController();

router.get("/talks", (req, res) => {
    res.render("index.html");
});

router.get("favicon.ico", (req, res) => res.sendFile("images/icon.png"));

router.post("/signup", usersController.create);
router.post("/login", usersController.loginIn);
router.post("/send", messagesController.createFromReq);
router.post("/listMessages", messagesController.listByUser);
router.post("/listMessagesByTalk", messagesController.listByTalk);

router.post("/createTalk", talksController.createFromReq);
router.post("/listTalks", talksController.listByUser);

export { router };
