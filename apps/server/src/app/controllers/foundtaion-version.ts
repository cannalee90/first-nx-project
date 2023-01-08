import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SupabaseService } from '../../services/supabase';

@Controller('foundation-version')
export class FoundationVersion {
  constructor(private supabaseService: SupabaseService) {}

  @Post()
  async publishNewVersion(@Body() body) {
    console.log('version : ', body.version);

    return body;
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
    console.log('version : ', version);

    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('foundation_version')
      .select('*')
      .eq('version', version)
      .limit(1);
    return data?.[0] ?? null;
  }
}
