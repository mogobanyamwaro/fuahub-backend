import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/user.input';
import { Logger } from '@nestjs/common';
import { DefaultResponse } from '@mamafuahub/backend/shared';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async createUser(userInput: CreateUserInput): Promise<DefaultResponse> {
    this.logger.log({
      title: 'Create User',
      data: userInput,
      Mutation: 'createUser',
      Location: 'UserService',
    });
    try {
      this.userRepository.create(userInput);
      await this.userRepository.save(userInput);
      return {
        message: 'User created successfully',
        success: true,
      };
    } catch (error) {
      this.logger.error({
        title: 'Create User',
        data: error,
        Mutation: 'createUser',
        Location: 'UserService',
      });
      console.log('mogona', error);
      return {
        message: 'User not created',
        success: false,
      };
    }
  }
  async getAll(): Promise<User[]> {
    this.logger.log({
      title: 'Get All Users',
      Query: 'getAll',
      Location: 'UserService',
    });
    try {
      return this.userRepository.find({});
    } catch (error) {
      this.logger.error({
        title: 'Get All Users',
        data: error,
        Query: 'getAll',
        Location: 'UserService',
      });
      return [];
    }
  }
  async findOne(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      this.logger.error({
        title: 'Get All Users',
        data: error,
        Query: 'getAll',
        Location: 'UserService',
      });
    }
  }
}
