import { Module } from '@nestjs/common';
import { SupabaseService } from './services/supabase';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FoundationVersion } from './controllers/foundtaion-version';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, FoundationVersion],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
