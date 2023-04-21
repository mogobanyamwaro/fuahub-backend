import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
@Module({
  controllers: [],
  providers: [UserService, UserResolver],
  exports: [],
  imports: [TypeOrmModule.forFeature([User])],
})
export class BackendUsersModule {}
