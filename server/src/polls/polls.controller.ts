import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePollDTO, JoinPollDTO } from './dto';
import { PollService } from './polls.service';
import { ControllerAuthGuard } from './controller-auth.guard';
import { RequestWithAuth } from './types';

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
    const result = await this.pollService.joinPoll(joinPollDto);
    return result;
  }

  @UseGuards(ControllerAuthGuard)
  @Post('/rejoin')
  async rejoin(@Req() request: RequestWithAuth) {
    const { userID, pollID, name } = request;
    const result = await this.pollService.rejoinPoll({
      name,
      pollID,
      userID,
    });
    return result;
  }
}
