import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.userRepository.findOne({
      where: { id: createTaskDto.userId },
    });
    const assignedUsers = await this.userRepository.find({
      where: { id: In(createTaskDto.assignedUserIds) },
    });
    const task = this.taskRepository.create({
      ...createTaskDto,
      user,
      assignedUsers,
    });
    return await this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .leftJoinAndSelect('task.assignedUsers', 'assignedUsers')
      .getMany();
  }

  async findOne(id: number) {
    return await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .leftJoinAndSelect('task.assignedUsers', 'assignedUsers')
      .where('task.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .leftJoinAndSelect('task.assignedUsers', 'assignedUsers')
      .where('task.id = :id', { id })
      .getOne();

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    if (updateTaskDto.assignedUserIds) {
      task.assignedUsers = await this.userRepository.findByIds(
        updateTaskDto.assignedUserIds,
      );
    }

    return await this.taskRepository.save(task);
  }

  async remove(id: number) {
    return await this.taskRepository.softDelete({ id });
  }
}
