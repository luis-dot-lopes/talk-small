import { TalksService } from "../services/TalksService";
import { UsersService } from "../services/UsersService";
import { UsersController } from "./UsersController";
import { Request, Response } from "express";

class TalksController {

	async createFromReq(req: Request, res: Response) {
		/**
		 * Takes a request and creates a talk
		 * Returns the created talk object
		 * Test only
		 */
		
		const { session_id, user2_id } = req.body;

		const talksService = new TalksService();
		const usersService = new UsersService();
		
		const creatorLogged = UsersController.active_sessions[session_id];
		const user2Exists = await usersService.findByID(user2_id);

		if(creatorLogged && user2Exists) {
			const talk = await talksService.create({
				user_id1: creatorLogged.user_id,
				user_id2: user2_id,
			});

			return res.json(talk);
		} else {
			return res.json({ error: "One of the IDs is not valid" });
		}

	}

}

export { TalksController };
