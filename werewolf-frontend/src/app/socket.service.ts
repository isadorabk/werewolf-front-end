import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';
// import { LifecycleHooks } from '../../node_modules/@angular/compiler/src/lifecycle_reflector';
import { Command } from '../../node_modules/protractor';

const SERVER_URL = "http://werewolf-game.local:3000";
// const SERVER_URL = "http://localhost:3000";

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
    console.log(this.socket);
    
    this.socket.on('connect', () => {
      if (identification.adminCode) {
        console.log('Admin connected', this.socket.id);
        this.socket.emit('createGame', gameId, identification.adminCode);
      } else {
        console.log('Player connected', this.socket.id);
        this.socket.emit('joinGame', gameId, identification.playerId);
      }
    });

    this.socket.on('disconnect', () => {
      if (identification.adminCode) {
        console.log('Admin disconnected', this.socket.id);
      } else {
        console.log('Player disconnected', this.socket.id);
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


}
