// import { Request } from '@nestjs/common';
import { Request } from 'express';
import { type } from 'os';
import { Socket } from 'socket.io';
//service types
export type CreatePollFriends = {
  topic: string;
  votesPerVoter: number;
  name: string;
};

export type JoinPollFriends = {
  pollID: string;
  name: string;
};

export type RejoinPollFriends = {
  pollID: string;
  name: string;
  userID: string;
};
//repo types

export type CreatePollData = {
  pollID: string;
  topic: string;
  votesPerVoter: number;
  userID: string;
};

export type AddParticipantData = {
  pollID: string;
  userID: string;
  name: string;
};

//guard types
type AuthPayload = {
  userID: string;
  pollID: string;
  name: string;
};

export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;
