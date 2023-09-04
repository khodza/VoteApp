import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsController } from './polls.controller';
import { PollService } from './polls.service';
import { redisModule } from 'src/modules.config';
import { PollsRepository } from './polls.repository';

@Module({
  imports: [ConfigModule, redisModule],
  controllers: [PollsController],
  providers: [PollService, PollsRepository],
})
export class PollsModule {}
