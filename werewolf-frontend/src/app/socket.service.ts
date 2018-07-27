import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() { }
  private server = SERVER_URL;
  adminSocket;
  playerSocket

  initSocket(gameId: string, adminCode?: string): void {
    if (adminCode) this.adminSocket = io.connect(this.server + '/admin');
    console.log(this.adminSocket);
    
    this.adminSocket.on('connect', () => {
      console.log('Admin connected', this.adminSocket.id);
      this.adminSocket.emit('join', gameId, adminCode);
    });
  }

  initPlayerSocket(gameCode: string, playerId: string): void {
    this.playerSocket = io.connect(this.server + '/game');
    console.log(this.playerSocket);

    this.playerSocket.on('connect', () => {
      console.log('Player connected', this.playerSocket.id);
      this.playerSocket.emit('join', gameCode, playerId);
    });
  }
}
