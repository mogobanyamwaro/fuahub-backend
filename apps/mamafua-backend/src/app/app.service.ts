import { Injectable } from '@nestjs/common';

import { Logger } from '@nestjs/common';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  async getAll(): Promise<{ message: string; success: boolean }> {
    this.logger.log({
      title: 'Welcome to MamafuaHub',
      data: 'this is a test',
    });
    try {
      return {
        message: 'Welcome to MamafuaHub',
        success: true,
      };
    } catch (error) {
      this.logger.error({
        title: 'Welcome to MamafuaHub',
        data: error,
      });
      return {
        message: 'Welcome to MamafuaHub',
        success: false,
      };
    }
  }
}
