import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreatePollDTO, JoinPollDTO } from './dto';
import { PollService } from './polls.service';

@Controller('polls')
export class PollsController {
  constructor(private pollService: PollService) {}
  @Post()
  async crate(@Body() createPollDto: CreatePollDTO) {
    Logger.log('Creating a poll...');

    const result = await this.pollService.createPoll(createPollDto);
    return result;
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDTO) {
    Logger.log('Joining a poll...');
    const result = this.pollService.joinPoll(joinPollDto);
    return result;
  }

  @Post('/rejoin')
  async rejoin() {
    Logger.log('Rejoining a poll...');
    return this.pollService.rejoinPoll({
      userID: '1231',
      name: 'izzat',
      pollID: 'dd1',
    });
  }
}
