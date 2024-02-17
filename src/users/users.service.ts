import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ){

  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository
    .createQueryBuilder('user')
      .leftJoinAndSelect('user.tasks', 'task')
      .leftJoin('task.user', 'taskUser')
      .addSelect(['taskUser.id', 'taskUser.userName'])
      .addSelect(['user.id', 'user.userName'])
      .leftJoin('task.assignedUsers', 'assignedUser')
      .addSelect(['assignedUser.id', 'assignedUser.userName'])
      .leftJoinAndSelect('user.assignedTasks', 'assignedTask')
      .leftJoin('assignedTask.user', 'assignedTaskUser')
      .addSelect(['assignedTaskUser.id', 'assignedTaskUser.userName'])
      .where('user.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.softDelete({id});
  }
}
