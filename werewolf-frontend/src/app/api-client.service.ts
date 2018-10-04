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

// const SERVER_URL = "http://192.168.1.232:3000";
const SERVER_URL = "http://adriapalleja.local:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private server = SERVER_URL;
  gameCode: string;
  playerId: string;
  adminCode: string;

  constructor(private http: HttpClient) { }

  createGame(): Observable<Game> {
    return this.http.post<Game>(this.server + "/new-game", {}, httpOptions)
  }

  createPlayer(player: object): Observable<Player> {
    return this.http.post<Player>(this.server + "/new-player", player, httpOptions)
  }

  setGame(gameCode, adminCode, playerId): void {
    this.gameCode = gameCode;
    this.adminCode = adminCode;
    this.playerId = playerId;
  }

  getGame() {
    return {gameCode:this.gameCode, adminCode:this.adminCode, playerId:this.playerId};
  }

}
