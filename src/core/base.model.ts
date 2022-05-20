import { knexSnakeCaseMappers, Model } from 'objection';
import Knex from 'knex';

export const knex = Knex({
  client: 'postgres',
  useNullAsDefault: true,
  connection: {
    user: 'postgres',
    database: 'test_todo',
    host: 'localhost',
    port: 5432,
  },
  ...knexSnakeCaseMappers(),
});

Model.knex(knex);

export class BaseModel extends Model {}
