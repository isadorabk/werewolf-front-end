export class Player {
  playerId: string;
  username: string;
  role: string;
  lifeStatus: string;
  socketId?: any;
  card?: object;
  winner?: boolean;
  toVote: string;
  votes: number;
}
