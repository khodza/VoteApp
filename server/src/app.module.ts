import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollsModule } from './polls/polls.module';
import { jwtModule } from './modules.config';

@Module({
  imports: [ConfigModule.forRoot(), PollsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
