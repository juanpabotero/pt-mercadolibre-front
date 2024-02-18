import { Stat } from './training.interface';

export interface PlayersResponse {
  players: Player[];
}

export interface Player {
  id?: number;
  name: string;
}

export interface PlayersWithStats extends Player {
  stats: Stat[];
}

export interface PlayersWithScore extends Player {
  score: number;
}
