import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SupabaseService } from '../services/supabase';

@Controller('foundation-detail')
export class FoundationDetail {
  constructor(private supabaseService: SupabaseService) {}

  // @Post()
  // async upsertFoundationDetail(@Body() body) {}

  @Get(':foundation_id')
  async getFoundationVersion(@Param() params) {
    const { foundation_id } = params;
    const client = this.supabaseService.getClient();
    const { data } = await client
      .from('foundation_detail')
      .select('*')
      .eq('foundation_id', foundation_id)
      .limit(1);
    return data?.[0] ?? null;
  }
}
