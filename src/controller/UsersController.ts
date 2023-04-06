import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";
import { v4 as uuid } from "uuid";

interface IUserSession {
    id: string;
    user_id: string;
}

class UsersController {

/*  This is an object with the ids os the logged users' sessions as keys and
    the ids of the users as values. Used to check wheter a user exists or not */
    static active_sessions = {};

    //Creates an user from a /signup request
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

        UsersController.active_sessions[session.id] = session.user_id;
        
        console.log(session.id);

        return res.json({ user_id: session.id, raw_id: session.user_id });
    }

    //Creates new session for a user that logged in
    async loginIn(req: Request, res: Response) {
        
        const { email, password } = req.body;

        const usersService = new UsersService();

        const user = await usersService.findByEmail(email);

        if(user && user.password == password) {

            const session: IUserSession = { user_id: user.id, id: uuid() };

            UsersController.active_sessions[session.id] = session.user_id;

            console.log(session.id);

            return res.json({ user_id: session.id, raw_id: session.user_id });
        } else {
            return res.json({ message: "wrong email or password"});
        }

    }
}

export { UsersController };
