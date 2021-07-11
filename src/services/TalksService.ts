import { getCustomRepository, Repository } from "typeorm";
import { Talk } from "../entities/Talk";
import { TalksRepository } from "../repositories/TalksRepository";

interface ICreateTalk {
	user_id1: string;
	user_id2: string;
}

class TalksService {

	private talksRepository: Repository<Talk>;

	constructor() {
		this.talksRepository = getCustomRepository(TalksRepository);
	}

	async create({ user_id1, user_id2 } : ICreateTalk) {

		const talk = await this.talksRepository.create({
			user_id1,
			user_id2,
		});

		await this.talksRepository.save(talk);

		return talk;
	}

}

export { TalksService };
