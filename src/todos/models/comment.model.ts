import { JSONSchema, Model } from 'objection';
import { BaseModel } from 'src/core/base.model';
import { Task } from './task.model';

export class Comment extends BaseModel {
  static get tableName() {
    return 'comments';
  }

  static get idColumn() {
    return 'id';
  }

  id: string;
  taskId: string;
  content: string;
  createdAt: string;

  static get JSONSchema() {
    return {
      type: 'object',
      require: ['taskId'],
      properties: {
        taskId: { type: 'string' },
        content: { type: 'string' },
        createdAt: { type: 'Date' },
      },
    };
  }

  static relationMappings = () => ({
    task: {
      relation: Model.BelongsToOneRelation,
      modelClass: Task,
      join: {
        from: 'comments.taskId',
        to: 'tasks.id',
      },
    },
  });
}
