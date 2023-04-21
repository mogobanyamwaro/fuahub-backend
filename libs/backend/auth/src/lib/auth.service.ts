import { Injectable } from '@nestjs/common';
import { User, UserService } from '@mamafuahub/backend/users';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { jwtConstants } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken, RefreshToken } from './entities';
import { Repository } from 'typeorm';
import { addDays, addHours, isBefore } from 'date-fns';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(AccessToken)
    private readonly accessTokenRepo: Repository<AccessToken>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const isPasswordValid = compareSync(pass, user?.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Not Authorized',
      };
    }
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      username: user.profile?.username,
      role: user.role,
      status: user.status,
    });
    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        username: user.profile?.username,
        role: user.role,
        status: user.status,
      },

      { secret: jwtConstants.secret }
    );

    return this.saveTokens(user, refreshToken, accessToken);
  }
  async saveTokens(user: User, refreshToken: string, accessToken: string) {
    const refresh = await this.refreshTokenRepo.save(
      this.refreshTokenRepo.create({
        user,
        token: refreshToken,
        expiresAt: addDays(new Date(), 7),
      })
    );

    const access = await this.accessTokenRepo.save(
      this.accessTokenRepo.create({
        user,
        token: accessToken,
        expiresAt: addHours(new Date(), 6),
      })
    );

    return {
      refreshToken: refresh.token,
      refreshTokenExpiresAt: refresh.expiresAt,
      accessToken: access.token,
      accessTokenExpiresAt: access.expiresAt,
    };
  }
  // resendEmailVerification;
  // forgotPassword;
  // resetPassword;
  // changePassword;
  // verifyEmail
}
