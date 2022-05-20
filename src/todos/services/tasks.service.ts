import { Injectable } from '@nestjs/common';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { DBError } from 'objection';
import { CommentsService } from './comments.service';

@Injectable()
export class TasksService {
  constructor(private commentsService: CommentsService) {}

  async findTasks() {
    return await Task.query().orderBy('id', 'DESC');
  }

  async createTask(input: CreateTaskDto) {
    return Task.query().insert({
      content: input.content,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    });
  }

  async updateTask(id: string, input: CreateTaskDto) {
    const task = await Task.query().findById(id);
    if (!task) throw new Error('잘못된 id 요청입니다');
    return await task.$query().updateAndFetch(input);
  }

  async DeleteTask(id: string) {
    const task = await Task.query().findById(id);
    if (!task) throw new Error('잘못된 id 요청입니다.');
    await this.commentsService.deleteCommentsByTaskId(id);
    return await task.$query().deleteById(task.id);
  }
}
