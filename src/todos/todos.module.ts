import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { CommentsController } from './controllers/comments.controller';
import { TasksService } from './services/tasks.service';
import { CommentsService } from './services/comments.service';
import { TasksResolver } from './resolvers/tasks.resolver';

@Module({
  controllers: [TasksController, CommentsController],
  providers: [TasksResolver, TasksService, CommentsService],
})
export class TodosModule {}
