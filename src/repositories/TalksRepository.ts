import { EntityRepository, Repository } from "typeorm";
import { Talk } from "../entities/Talk";

@EntityRepository(Talk)
class TalksRepository extends Repository<Talk> {

}

export { TalksRepository };
