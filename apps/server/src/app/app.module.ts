import { Module } from '@nestjs/common';
import { SupabaseService } from './services/supabase';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FoundationVersion } from './controllers/foundtaion-version';
import { HttpModule } from '@nestjs/axios';
import { FoundationDetail } from './controllers/foundtaion-detail';
import { GithubService } from './services/github';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, FoundationVersion, FoundationDetail],
  providers: [AppService, SupabaseService, GithubService],
})
export class AppModule {}
