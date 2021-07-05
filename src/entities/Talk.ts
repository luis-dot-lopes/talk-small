import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';

@Entity("talks")
class Talk {

	@PrimaryColumn()
	id: string;

	@JoinColumn({name: "user_id1"})
	@ManyToOne(() => User)
	user1: User;

	@Column()
	user_id1: string;

	@JoinColumn({name: "user_id2"})
	@ManyToOne(() => User)
	user2: User;

	@Column()
	user_id2: string;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if(!this.id) {
			this.id = uuid();
		}
	}

}

export { Talk };
