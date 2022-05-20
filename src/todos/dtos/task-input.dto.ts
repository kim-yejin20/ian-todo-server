import { Field, InputType } from '@nestjs/graphql';

@InputType('TaskInput')
export class TaskInputDto {
  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Boolean, { nullable: true })
  isCompleted?: boolean;
}
