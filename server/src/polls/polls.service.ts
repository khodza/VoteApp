import { Injectable, Logger } from '@nestjs/common';
import { CreatePollFriends, JoinPollFriends, RejoinPollFriends } from './types';
import { createPollID, createUserID } from './ids';
import { PollsRepository } from './polls.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PollService {
  private readonly logger = new Logger(PollService.name);
  constructor(
    private pollRepository: PollsRepository,
    private jwtService: JwtService,
  ) {}

  async createPoll(fields: CreatePollFriends) {
    const pollID = createPollID();
    const userID = createUserID();

    const createdPoll = await this.pollRepository.createPoll({
      ...fields,
      pollID,
      userID,
    });
    this.logger.debug(
      `Created poll with ID :${createdPoll.id} and user ID :${userID}`,
    );

    const signedString = this.jwtService.sign(
      {
        pollID: createdPoll.id,
        name: fields.name,
      },
      { subject: userID },
    );

    return {
      poll: createdPoll,
      accessToken: signedString,
    };
  }

  async joinPoll(fields: JoinPollFriends) {
    const userID = createUserID();
    this.logger.debug(
      `Fetching poll with :${fields.pollID} for user with ID :${userID}`,
    );

    const joinedPoll = await this.pollRepository.getPoll(fields.pollID);

    this.logger.debug(
      `Created token string for pollID :${joinedPoll.id} and userID :${userID}`,
    );

    const signedString = this.jwtService.sign(
      {
        pollID: joinedPoll.id,
        name: fields.name,
      },
      { subject: userID },
    );

    return {
      poll: joinedPoll,
      accessToken: signedString,
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
