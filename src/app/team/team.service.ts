import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {
  DeletePLayerResponse,
  Player,
  PlayersResponse,
  TeamResponse,
  Training,
  TrainingResponse,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private readonly http: HttpClient) {}

  private readonly PATH_PLAYERS = '/players';
  private readonly PATH_TEAM = '/team';
  private readonly PATH_TRAINING = '/training';

  public createTrainig(training: Training): Observable<TrainingResponse> {
    return this.http.post<TrainingResponse>(
      `${environment.apiUrl}${this.PATH_TRAINING}`,
      training
    );
  }

  public createPLayer(player: Player): Observable<Player> {
    return this.http.post<Player>(
      `${environment.apiUrl}${this.PATH_PLAYERS}`,
      player
    );
  }

  public getPLayers(): Observable<PlayersResponse> {
    return this.http.get<PlayersResponse>(
      `${environment.apiUrl}${this.PATH_PLAYERS}`
    );
  }

  public getTeam(): Observable<TeamResponse> {
    return this.http.get<TeamResponse>(
      `${environment.apiUrl}${this.PATH_TEAM}`
    );
  }

  public removePlayer(id: number): Observable<DeletePLayerResponse> {
    return this.http.delete<DeletePLayerResponse>(
      `${environment.apiUrl}${this.PATH_PLAYERS}/${id}`
    );
  }
}
