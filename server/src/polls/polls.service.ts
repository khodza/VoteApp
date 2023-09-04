import { Injectable, Logger } from '@nestjs/common';
import { CreatePollFriends, JoinPollFriends, RejoinPollFriends } from './types';
import { createPollID, createUserID } from './ids';
import { PollsRepository } from './polls.repository';

@Injectable()
export class PollService {
  private readonly logger = new Logger(PollService.name);
  constructor(private pollRepository: PollsRepository) {}

  async createPoll(fields: CreatePollFriends) {
    const pollID = createPollID();
    const userID = createUserID();

    const createdPoll = await this.pollRepository.createPoll({
      ...fields,
      pollID,
      userID,
    });
    return {
      poll: createdPoll,
    };
  }

  async joinPoll(fields: JoinPollFriends) {
    const userID = createUserID();
    this.logger.debug(
      `Fetching poll with :${fields.pollID} for user with ID :${userID}`,
    );

    const joinedPoll = await this.pollRepository.getPoll(fields.pollID);

    return {
      poll: joinedPoll,
    };
  }

  async rejoinPoll(fields: RejoinPollFriends) {
    this.logger.debug(
      `Rejoining poll with ID :${fields.pollID} for user with ID ${fields.userID} with name ${fields.name}`,
    );
    const joinedPoll = await this.pollRepository.addParticipant(fields);

    return joinedPoll;
  }
}
