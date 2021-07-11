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

	//Tries to create talk
	//If it already exists, returns it
	async create({ user_id1, user_id2 } : ICreateTalk) {

		let talkExists = this.findByUsers(user_id1, user_id2);

		if(talkExists) {
			return talkExists;
		}

		const talk = await this.talksRepository.create({
			user_id1,
			user_id2,
		});

		await this.talksRepository.save(talk);

		return talk;
	}

	async findByUsers(user_id1: string, user_id2: string) {
		
		const talk = await this.talksRepository.findOne({
			where: [
				{
					user_id1: user_id1,
					user_id2: user_id2,
				},
				{
					user_id1: user_id2,
					user_id2: user_id1,
				},
			]
		});

		return talk;

	}

}

export { TalksService };
