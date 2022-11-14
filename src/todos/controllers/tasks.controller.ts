import {
  Controller,
  Body,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TasksService } from '../services';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAllTasks(@Res() res: Response) {
    const result = await this.tasksService.findTasks();
    return res.status(HttpStatus.OK).json(result);
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto, @Res() res: Response) {
    if (task.content == undefined)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: '내용을 입력해주세요' });

    const result = await this.tasksService.createTask(task);
    return res.status(HttpStatus.CREATED).json(result);
  }

  /**
   * todo의 content를 수정
   * localhost:3000/tasks/:id
   */
  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: CreateTaskDto,
    @Res() res: Response,
  ) {
    const result = await this.tasksService.updateTask(id, task);
    return res.status(HttpStatus.OK).json(result);
  }

  // @Delete(':id')
  // async deleteTask(@Param('id') id: string, @Res() res: Response) {
  //   const result = await this.tasksService.DeleteTask(id);
  //   return res.status(HttpStatus.OK).json('삭제완료');
  // }
}
