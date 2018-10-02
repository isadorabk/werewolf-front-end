import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
// import { LifecycleHooks } from '../../node_modules/@angular/compiler/src/lifecycle_reflector';
import { Command } from '../../node_modules/protractor';

// const SERVER_URL = "http://werewolf-game.local:3000";
const SERVER_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor() { }
  private server = SERVER_URL;
  socket;


  message: EventEmitter<object> = new EventEmitter<object>();

  initSocket(gameId: string, identification?: any): void {
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

  startGame(gameId: string): void {
    this.socket.emit('startGame', gameId)
  }

  startRound(gameId: string, round: string): void {
    this.socket.emit('startRound', gameId, round)
  }

  killPlayer(gameId: string, playerId: string): void {
    this.socket.emit('killPlayer', gameId, playerId)
  }

  voteToKill(gameId: string, playerId: string): void {
    this.socket.emit('voteToKill', gameId, playerId);
  }

  startVote(gameId: string): void {
    this.socket.emit('startVote', gameId);
  }

}
