import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Task {

    // @PrimaryGeneratedColumn
    @Column({primary: true, generated: true})
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    text: string;

    @Column()
    state: boolean;

    @Column()
    dateStart: Date;

    @Column()
    dateEnd: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}
