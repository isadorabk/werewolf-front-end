import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Game } from './classes/game';
import { Player } from './classes/player';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private server = SERVER_URL;
  gameId: string;

  constructor(private http: HttpClient) { }

  createGame(): Observable<Game> {
    return this.http.post<Game>(this.server + "/new-game", {}, httpOptions)
  }

  createPlayer(player: object): Observable<Player> {
    return this.http.post<Player>(this.server + "/new-player", player, httpOptions)
  }

  sendGameId(gameIdSource): void {
    this.gameId = gameIdSource;
  }

  getGameId(): string {
    return this.gameId;
  }

  getPlayers(gameId: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.server + `/game/${gameId}`)
  }
  
  
}
