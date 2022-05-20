import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Task')
export class TaskDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => String)
  createdAt: string;
}
