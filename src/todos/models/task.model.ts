import { JSONSchema } from 'objection';
import { Comment } from './comment.model';
import { BaseModel } from 'src/core/base.model';

export class Task extends BaseModel {
  static get tableName() {
    return 'tasks';
  }

  static get idColumn() {
    return 'id';
  }

  id: string;
  content: string;
  isCompleted: boolean;
  createdAt: string;

  static JSONSchema = {
    type: 'object',
    properties: {
      content: { type: 'string' },
      isCompleted: { type: 'boolean' },
      createdAt: { type: 'string' },
    },
  };

  static get relationMappings() {
    return {
      comments: {
        relation: BaseModel.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'task.id',
          to: 'comment.taskId',
        },
      },
    };
  }
}
