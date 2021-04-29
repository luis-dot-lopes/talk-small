import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity("messages")
class Message {

    @PrimaryColumn()
    id: string;

    @JoinColumn({ name: "sender_id" })
    @ManyToOne(() => User)
    sender: User;

    @Column()
    sender_id: string;

    @JoinColumn({ name: "reciever_id" })
    @ManyToOne(() => User)
    reciever: User;
    
    @Column()
    reciever_id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;
    
}

export { Message };
