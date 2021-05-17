import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";
import { v4 as uuid } from "uuid";

interface IUserSession {
    id: string;
    user_id: string;
}

class UsersController {

    static active_sessions: IUserSession[] = [];

    async create(req: Request, res: Response) {
        
        const { email, password, username } = req.body;

        const usersService = new UsersService();

        const emailExists = await usersService.findByEmail(email);

        if(emailExists) {
            return res.send({
                message: "This email is already in use"
            });
        } 
        
        const user = await usersService.create({
            email,
            password,
            username,
        });

        const session: IUserSession = { user_id: user.id, id: uuid() };

        UsersController.active_sessions.push(session);

        return res.json({ user_id: session.id });
    }

    async loginIn(req: Request, res: Response) {
        
        const { email, password } = req.body;

        const usersService = new UsersService();

        const user = await usersService.findByEmail(email);

        if(user && user.password == password) {
            return res.json({ user_id: user.id });
        } else {
            return res.json({ message: "wrong email or password"});
        }

    }
}

export { UsersController };
