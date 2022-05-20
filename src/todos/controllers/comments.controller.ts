import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { Response } from 'express';
import { CreateCommentDto } from '../dtos/create-comment.dto';

@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  async findAllComments(@Param('taskId') taskId: string, @Res() res: Response) {
    const result = await this.commentService.findComments(taskId);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post()
  async createComment(
    @Param('taskId') taskId: string,
    @Body() params: CreateCommentDto,
    @Res() res: Response,
  ) {
    const comment = await this.commentService.createComment(taskId, params);
    return res.status(HttpStatus.CREATED).json(comment);
  }

  @Put(':commentId')
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() comment: CreateCommentDto,
    @Res() res: Response,
  ) {
    const result = await this.commentService.updateComment(commentId, comment);
    return res.status(HttpStatus.OK).json(result);
  }

  @Delete('/:commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @Res() res: Response,
  ) {
    const result = await this.commentService.deleteComment(commentId);
    return res.status(HttpStatus.OK).json('댓글삭제완료');
  }
}
