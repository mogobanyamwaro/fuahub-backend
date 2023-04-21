import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { BackendUsersModule } from '@mamafuahub/backend/users';
import { jwtConstants } from './constants';
@Module({
  imports: [
    BackendUsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class BackendAuthModule {}
