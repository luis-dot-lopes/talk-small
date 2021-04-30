import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from "uuid";

@Entity("messages")
class Message {

    @PrimaryColumn()
    id: string;

    @JoinColumn({ name: "sender_id" })
    @ManyToOne(() => User)
    sender: User;

    @Column()
    sender_id: string;

    @JoinColumn({ name: "receiver_id" })
    @ManyToOne(() => User)
    receiver: User;
    
    @Column()
    receiver_id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
    
}

export { Message };
