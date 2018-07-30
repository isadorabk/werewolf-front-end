import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { LifecycleHooks } from '../../node_modules/@angular/compiler/src/lifecycle_reflector';

const SERVER_URL = "http://localhost:3000";
// const SERVER_URL = "http://192.168.1.255:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private router: Router) { }
  private server = SERVER_URL;
  socket;
  player;
  round;
  lifeStatus = 'alive';

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

    this.socket.on('player', (player) => {
      this.player = player;
      console.log('Socket on player', this.socket.id);
      this.router.navigateByUrl('/game');
    });

    this.socket.on('updateRound', (round) => {
      this.round = round;
    });

    this.socket.on('updateLifeStatus', (lifeStatus) => {
      this.lifeStatus = lifeStatus;
    })
  }

  startGame(gameId: string): void {
    this.socket.emit('startGame', gameId)
  }

  startRound(gameId: string, type: string): void {
    this.socket.emit('startRound', gameId, type)
  }

  killPlayer(gameId: string, playerId: string): void {
    this.socket.emit('killPlayer', gameId, playerId)
  }

  getPlayer(): string {
    return this.player;
  }

  getRound(): string {
    return this.round;
  }

  getLifeStatus(): string {
    return this.lifeStatus;
  }
}
