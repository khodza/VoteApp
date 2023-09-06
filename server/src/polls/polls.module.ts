import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsController } from './polls.controller';
import { PollService } from './polls.service';
import { jwtModule, redisModule } from 'src/modules.config';
import { PollsRepository } from './polls.repository';
import { PollsGateway } from './poll.gateway';

@Module({
  imports: [ConfigModule, redisModule, jwtModule],
  controllers: [PollsController],
  providers: [PollService, PollsRepository, PollsGateway],
})
export class PollsModule {}
