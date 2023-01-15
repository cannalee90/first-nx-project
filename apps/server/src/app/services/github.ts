import { HttpService } from '@nestjs/axios';
import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class GithubService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService
  ) {}

  private getHeaders() {
    return {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${this.config.get('GITHUB_TOKEN')}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  async triggerGithubActions(url: string, version: string, ref = 'main') {
    const { data } = await firstValueFrom(
      this.httpService.post(
        url,
        {
          ref,
          inputs: {
            version,
          },
        },
        {
          headers: this.getHeaders(),
        }
      )
    );
    return data;
  }
}
