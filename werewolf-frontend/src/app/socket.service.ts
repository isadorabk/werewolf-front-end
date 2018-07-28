import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() { }
  private server = SERVER_URL;
  socket

  initSocket(gameId: string, identification?: any): void {
    this.socket = io.connect(this.server);
    console.log(this.socket);
    
    this.socket.on('connect', () => {
      if (identification.adminCode) {
        console.log('Admin connected', this.socket.id);
        this.socket.emit('createGame', gameId, identification.adminCode);
      } else {
        console.log('Player connected', this.socket.id);
        this.socket.emit('join', gameId, identification.playerId);
      }

    });
  }
}
