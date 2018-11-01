import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';

const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() { }
  private server = SERVER_URL;
  socket;
  gameId;


  message: EventEmitter<object> = new EventEmitter<object>();

  initSocket(gameId: string, identification?: any): void {
    this.gameId = gameId;
    this.socket = io.connect(this.server);
    this.socket.on('connect', () => {
      if (identification.adminCode) {
        this.socket.emit('createGame', gameId, identification.adminCode);
      } else {
        this.socket.emit('joinGame', gameId, identification.playerId);
      }
    });

    this.socket.on('gameCommand', (command, payload, cb) => {
      this.message.emit({
        command,
        payload,
      });
    });

  }

  getAdminInfo(gameId: string): void {
    this.socket.emit('retrieveGame', gameId);
  }

  startGame(gameId: string): void {
    this.socket.emit('startGame', gameId);
  }

  startRound(gameId: string, round: string): void {
    this.socket.emit('startRound', gameId, round);
  }

  killPlayer(gameId: string, playerId: string): void {
    this.socket.emit('killPlayer', gameId, playerId);
  }

  voteToKill(playerId: string, voterId: string): void {
    this.socket.emit('voteToKill', this.gameId, playerId, voterId);
  }

  startVote(gameId: string): void {
    this.socket.emit('startVote', gameId);
  }

  finishVote(gameId: string): void {
    this.socket.emit('finishVote', gameId);
  }

}
