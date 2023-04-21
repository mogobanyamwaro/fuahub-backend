import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return object with message propperty', async () => {
      const result = await app.get<AppController>(AppController).getData();
      console.log(result);
      expect(result).toMatchObject({
        message: 'Welcome to MamafuaHub',
        success: true,
      });
    });
  });
});
