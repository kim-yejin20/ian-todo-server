import { Field, ID, ObjectType } from '@nestjs/graphql';

// @ObjectType('User')
// export class UserDto {
//   @Field()
//   id: string;

//   @Field()
//   username: string;
// }

@ObjectType('Task')
export class TaskDto {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => String)
  createdAt: string;

  // @Field(() => String)
  // secretMessage: string;

  // @Field(() => UserDto)
  // user: UserDto;
}
