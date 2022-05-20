import { Injectable } from '@nestjs/common';
import { Comment } from '../models/comment.model';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { Task } from '../models/task.model';

@Injectable()
export class CommentsService {
  async findComments(taskId: string) {
    return await Comment.query().where('taskId', taskId).orderBy('id');
  }

  async createComment(taskId: string, input: CreateCommentDto) {
    // Q. task의 id를 먼저 찾고, 없으면 없다고 에러를 반환해야하는지? 이거까지는 할 필요가 없을까? 일단 해보고 물어보자
    return await Comment.query().insert({
      taskId: taskId,
      content: input.content,
      createdAt: new Date().toISOString(),
    });
  }

  async updateComment(commentId: string, input: CreateCommentDto) {
    const comment = await Comment.query().findById(commentId);
    if (!comment) throw new Error('잘못된 id 요청입니다');
    return await comment.$query().updateAndFetch(input);
  }

  async deleteComment(commentId: string) {
    const comment = await Comment.query().findById(commentId);
    if (!comment) throw new Error('아이디가 없습니다.');
    return await comment.$query().delete();
  }

  async deleteCommentsByTaskId(taskId: string) {
    await Comment.query().where('taskId', taskId).delete();
    return true;
  }
}
