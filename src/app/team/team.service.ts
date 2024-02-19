import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {
  DeletePLayerResponse,
  Player,
  PlayersResponse,
  Response,
  TeamResponse,
  Training,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private readonly http: HttpClient) {}

  private readonly API_URL = environment.API_URL;
  private readonly PATH_PLAYERS = '/players';
  private readonly PATH_TEAM = '/team';
  private readonly PATH_TRAINING = '/training';

  public createTrainig(training: Training): Observable<Response> {
    return this.http.post<Response>(
      `${this.API_URL}${this.PATH_TRAINING}`,
      training
    );
  }

  public createPLayer(player: Player): Observable<Player> {
    return this.http.post<Player>(
      `${this.API_URL}${this.PATH_PLAYERS}`,
      player
    );
  }

  public getPLayers(): Observable<PlayersResponse> {
    return this.http.get<PlayersResponse>(
      `${this.API_URL}${this.PATH_PLAYERS}`
    );
  }

  public getTeam(): Observable<TeamResponse> {
    return this.http.get<TeamResponse>(`${this.API_URL}${this.PATH_TEAM}`);
  }

  public removePlayer(id: number): Observable<DeletePLayerResponse> {
    return this.http.delete<DeletePLayerResponse>(
      `${this.API_URL}${this.PATH_PLAYERS}/${id}`
    );
  }
}
