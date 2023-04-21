import { Resolver } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { CreateUserInput } from '../dto/user.input';
import { DefaultResponse } from '@mamafuahub/backend/shared';
@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query((type) => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }
  @Mutation((returns) => DefaultResponse)
  createUser(
    @Args('userInput') userInput: CreateUserInput
  ): Promise<DefaultResponse> {
    return this.userService.createUser(userInput);
  }
}
