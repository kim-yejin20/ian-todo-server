import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskInputDto } from '../dtos/task-input.dto';
import { TaskDto } from '../dtos/task.dto';
import { TasksService } from '../services';

@Resolver(() => TaskDto)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [TaskDto])
  async tasks() {
    const tasks = await this.tasksService.findTasks();
    return tasks;
  }

  @Mutation(() => TaskDto)
  async createTask(
    @Args('input', { type: () => TaskInputDto }) input: TaskInputDto,
  ) {
    const task = await this.tasksService.createTask(input);
    return task;
  }
}
