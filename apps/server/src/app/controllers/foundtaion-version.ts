import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GithubService } from '../services/github';
import { SupabaseService } from '../services/supabase';

@Controller('foundation-version')
export class FoundationVersion {
  constructor(
    private supabaseService: SupabaseService,
    private githubService: GithubService
  ) {}

  @Post('deploy')
  async deploy(@Body() body) {
    const { version } = body;

    const ret = await this.githubService.triggerGithubActions(
      'https://api.github.com/repos/cannalee90/first-nx-project/actions/workflows/45167464/dispatches',
      version
    );
    console.log(ret);
  }

  @Post()
  async upsertFoundationVersion(@Body() body) {
    const client = this.supabaseService.getClient();
    const { version, status } = body;

    const ret = await this.getFoundationVersion({
      semantic_version: version,
    });

    if (ret) {
      const { data } = await client
        .from('foundation_version')
        .update({ semantic_version: version, status })
        .eq('id', ret.id)
        .select();
      return data;
    }

    const { data } = await client
      .from('foundation_version')
      .insert({ semantic_version: version, status })
      .select();

    return data;
  }

  @Get()
  async getAllFoundationVersions() {
    const client = this.supabaseService.getClient();
    const { data } = await client.from('foundation_version').select('*');
    return data;
  }

  @Get(':version')
  async getFoundationVersion(@Param() params) {
    const { version } = params;
    console.log('find version : ', version);

    const client = this.supabaseService.getClient();
    const { data } = await client
      .from('foundation_version')
      .select('*')
      .eq('semantic_version', version)
      .limit(1);
    return data?.[0] ?? null;
  }
}
