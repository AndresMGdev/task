import { Task } from "src/tasks/entities/task.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity("User")
export class User {
    @Column({primary: true, generated: true})
    id: number;

    @Column()
    name: string;
    
    @Column()
    lastName: string;
    
    @Column()
    age: number;
    
    @Column({unique: true})
    userName: string;
    
    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @ManyToMany(() => Task)
    @JoinTable({
        name: 'user_task',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'task_id',
            referencedColumnName: 'id',
        },
    })
    assignedTasks: Task[];
}
