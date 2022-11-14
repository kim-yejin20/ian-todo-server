import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
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

  @Query(() => TaskDto)
  async task(@Args('id', { type: () => ID }) id: string) {
    const task = await this.tasksService.findTask(id);
    return task;
  }

  @Mutation(() => TaskDto)
  async createTask(
    @Args('input', { type: () => TaskInputDto }) input: TaskInputDto,
  ) {
    const task = await this.tasksService.createTask(input);
    return task;
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id', { type: () => ID }) id: string) {
    const task = await this.tasksService.DeleteTask(id);
    if (!task) return false;
    return true;
  }

  @Mutation(() => TaskDto)
  async updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => TaskInputDto }) input: TaskInputDto,
  ) {
    const task = await this.tasksService.updateTask(id, input);
    return task;
  }

  // @ResolveField()
  // async secretMessage(@Parent() task: TaskDto, @MyInfo() me: User) {
  //   if (task.userId === me.id) return task.secretMessage;
  //   return ''
  // }

  // @ResolveField()
  // async user(@Parent() task: TaskDto) {
  //   const user = await this.usersService.findUser(task.userId);
  //   return user;
  // }
}
