import { Controller, Get, Param } from '@nestjs/common';
import { SupabaseService } from '../services/supabase';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private supabaseService: SupabaseService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('foundataion-version')
  async getAllFoundationVersions() {
    const client = this.supabaseService.getClient();
    const { data, error } = await client.from('foundation_version').select('*');
    return data;
  }

  @Get('foundataion-version/:version')
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
