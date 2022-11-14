import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('TaskUpdate')
export class TaskUpdateDto {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Boolean, { nullable: true })
  isCompleted?: boolean;
}
