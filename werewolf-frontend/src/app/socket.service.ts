import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';

const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() { }
  private server = SERVER_URL;
  private socket;

  initSocket(): void {
    this.socket = socketIo(this.server);
  }

}
