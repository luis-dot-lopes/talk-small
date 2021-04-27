import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {
    async create(req: Request, res: Response) {
        console.log(req.body);
        const { email, password, username } = req.body;

        const usersService = new UsersService();
        
        const user = await usersService.create({
            email,
            password,
            username,
        });

        return res.json(user);
    }
}

export { UsersController };
