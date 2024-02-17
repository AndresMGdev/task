import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

@Entity("Task")
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

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToMany(() => User, (user) => user.assignedTasks)
    @JoinTable({
        name: 'user_task',
        joinColumn: {
            name: 'task_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    assignedUsers?: User[];
}
