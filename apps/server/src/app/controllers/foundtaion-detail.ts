import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SupabaseService } from '../services/supabase';

@Controller('foundation-detail')
export class FoundationDetail {
  client = this.supabaseService.getClient();

  constructor(private supabaseService: SupabaseService) {}

  @Post()
  async insertFoundationDetail(@Body() body) {
    const { version } = body;
    if (!version) {
      throw new Error('Version is required');
    }
    const { data } = await this.client
      .from('foundation_version')
      .insert({ semantic_version: version, status: false })
      .select();

    if (!data[0]) {
      throw new Error('Transaction failed to insert');
    }

    const { data: ret } = await this.client.from('foundation_detail').insert({
      typography: body.typography,
      color: body.color,
      spacing: body.spacing,
      foundation_id: data[0].id,
    });

    if (!ret[0]) {
      throw new Error('Transaction failed to insert');
    }

    return ret;
  }

  @Get(':foundation_id')
  async getFoundationVersion(@Param() params) {
    const { foundation_id } = params;

    const { data } = await this.client
      .from('foundation_detail')
      .select('*')
      .eq('foundation_id', foundation_id)
      .limit(1);
    return data?.[0] ?? null;
  }
}
