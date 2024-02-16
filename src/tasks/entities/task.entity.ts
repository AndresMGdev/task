import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Task {

    // @PrimaryGeneratedColumn
    @Column({primary: true, generated: true})
    id: number;

    @Column({length: 100})
    title: string;

    @Column({length: 255})
    description: string;

    @Column({length: 1000})
    text: string;

    @Column("bool")
    isActive: boolean;

    @DeleteDateColumn()
    deleteAt: Date;
}
