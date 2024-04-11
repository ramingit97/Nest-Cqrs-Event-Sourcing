import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm'



@Entity('events')
export class EventsEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    event_type:string;

    @Column('jsonb', { nullable: false, default: {} })
    event_data: any;


    @CreateDateColumn()
    created_at: Date;
}
