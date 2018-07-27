import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() { }
  private server = SERVER_URL;
  adminSocket

  initSocket(gameId: string, adminCode?: string): void {
    if (adminCode) this.adminSocket = io.connect(this.server + '/admin');
    console.log(this.adminSocket);
    
    this.adminSocket.on('connect', () => {
      console.log('Connected');
      this.adminSocket.emit('join', gameId, adminCode);
    });
  }
}
