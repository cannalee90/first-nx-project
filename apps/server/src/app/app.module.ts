import { Module } from '@nestjs/common';
import { SupabaseService } from '../services/supabase';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
