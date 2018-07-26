import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { NewGame } from './classes/newGame';

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

  constructor(private http: HttpClient) { }

  createGame(): Observable<NewGame> {
    return this.http.post<NewGame>(this.server + "/new-game", {}, httpOptions)
  }
}
