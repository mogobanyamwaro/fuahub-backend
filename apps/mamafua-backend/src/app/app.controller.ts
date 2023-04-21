import { Controller, Get } from '@nestjs/common';
// nx generate @nestjs/schematics:resolver blog
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): Promise<{ message: string; success: boolean }> {
    return this.appService.getAll();
  }
}
