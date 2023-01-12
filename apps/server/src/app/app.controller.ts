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

  @Get('github')
  async githubActions() {
    console.log(this.config.get('GITHUB_TOKEN'));
    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://api.github.com/repos/cannalee90/first-nx-project/actions/workflows/45167464/dispatches',
        {
          ref: 'main',
          inputs: {
            version: '1.0.0',
          },
        },
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${this.config.get('GITHUB_TOKEN')}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        }
      )
    );
    return data;
  }
}


