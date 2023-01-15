import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService
  ) {}

  @Get()
  getData() {
    return {
      status: 'ok',
    };
  }
}


