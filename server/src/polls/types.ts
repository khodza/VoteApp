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
