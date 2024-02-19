import { FormControl } from '@angular/forms';
import { PlayersWithStats } from './player.interface';

export interface Response {
  message: string;
}

export interface Training {
  players: PlayersWithStats[];
}

export interface Stat {
  power: string;
  speed: Speed;
  passes: string;
}

export interface Speed {
  distance: string;
  time: string;
}

export interface TrainingForm {
  power: FormControl<string>;
  distance: FormControl<string>;
  time: FormControl<string>;
  passes: FormControl<string>;
}
