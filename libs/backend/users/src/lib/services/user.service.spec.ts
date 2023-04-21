import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USerStatus, UserRole } from '@mamafuahub/backend/shared';
import { faker } from '@faker-js/faker';
import { CreateUserInput } from '../dto/user.input';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a user', async () => {
    const email = faker.internet.email();
    const userInput: CreateUserInput = {
      email: email,
      password: '123456',
      role: UserRole.EMPLOYEE,
      status: USerStatus.ACTIVE,
    };
    const savedUser = new User();
    savedUser.email = email;
    savedUser.password = '129302392';
    savedUser.role = UserRole.EMPLOYEE;
    savedUser.status = USerStatus.ACTIVE;
    jest.spyOn(userRepository, 'create').mockReturnValue(savedUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue(undefined);
    const result = await service.createUser(userInput);

    expect(result).toMatchObject({
      message: 'User created successfully',
      success: true,
    });
  });
  it('should return all users', async () => {
    const users = [new User(), new User(), new User()];
    jest.spyOn(userRepository, 'find').mockResolvedValue(users);
    const result = await service.getAll();
    expect(result).toMatchObject(users);
  });
});
