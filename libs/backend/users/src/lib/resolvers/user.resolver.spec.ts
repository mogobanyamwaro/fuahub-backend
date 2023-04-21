import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from '../services/user.service';
import { CreateUserInput } from '../dto/user.input';
import {
  DefaultResponse,
  USerStatus,
  UserRole,
} from '@mamafuahub/backend/shared';
//https://github.com/nestjs/nest/blob/master/sample/31-graphql-federation-code-first/posts-application/src/posts/posts.resolver.spec.ts

const mockUser: CreateUserInput = {
  email: 'test@gmail.com',
  password: '123456',
  role: UserRole.EMPLOYEE,
  status: USerStatus.ACTIVE,
};

const userServiceMock = {
  createUser: jest.fn((): DefaultResponse => {
    return {
      message: 'User created successfully',
      success: true,
    };
  }),
  getAll: jest.fn((): User[] => {
    return [];
  }),
};

describe('UserResolver', () => {
  let resolver: UserResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();
    resolver = module.get<UserResolver>(UserResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should create a user', async () => {
    const result = await resolver.createUser(mockUser);
    expect(result).toMatchObject({
      message: 'User created successfully',
      success: true,
    });
  });
  it('should get all users', async () => {
    const result = await resolver.getAllUsers();
    console.log(result);
    expect(Array.isArray(result)).toBe(true);
  });
});
