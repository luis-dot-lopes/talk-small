import { Router } from "express";
import { UsersController } from "./controller/UsersController";

const router = Router();

const usersController = new UsersController();

router.get("/", (req, res) => {
    res.render("index.html");
});

router.post("/signup", usersController.create);
router.post("/login", usersController.loginIn);

export { router };
