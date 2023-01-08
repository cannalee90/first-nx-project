import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SupabaseService } from '../services/supabase';

@Controller('foundation-version')
export class FoundationVersion {
  constructor(private supabaseService: SupabaseService) {}

  @Post()
  async publishNewVersion(@Body() body) {
    const client = this.supabaseService.getClient();

    const ret = await this.getFoundationVersion({
      version: body.version,
    });

    if (ret) {
        const { data } = await client.from('foundation_version')
            .update({ version: body.version, status: body.status })
            .eq('id', ret.id)
            .select();
        return data;
    }

    const { data } = await client.from('foundation_version')
        .insert({ version: body.version })
        .select();
    return data
  }

  @Get()
  async getAllFoundationVersions() {
    const client = this.supabaseService.getClient();
    const { data, error } = await client.from('foundation_version').select('*');
    return data;
  }

  @Get(':version')
  async getFoundationVersion(@Param() params) {
    const { version } = params;
    console.log('find version : ', version);

    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('foundation_version')
      .select('*')
      .eq('version', version)
      .limit(1);
    return data?.[0] ?? null;
  }
}
