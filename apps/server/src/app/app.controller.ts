import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  getData() {
    return {
      status: 'ok',
    };
  }

  @Get('github')
  async githubActions() {
    const { data } = await firstValueFrom(
      this.httpService.get('https://api.github.com/gists')
    );
    return data;
  }
}
