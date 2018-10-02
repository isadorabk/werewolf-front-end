import { Component, OnInit } from '@angular/core';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from '../api-client.service';
import { SocketService } from '../socket.service';
import { Player } from '../classes/player';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.sass']
})
export class AdminPageComponent implements OnInit {
  faSun = faSun;
  faMoon = faMoon;
  gameStarted = false;
  gameEnded = false;
  gameId: string;
  players = [];
  werewolves = [];
  specialRoles = [];
  villagers = [];

  constructor(private apiClientService: ApiClientService, private socketService: SocketService) { }

  ngOnInit() {
    this.gameId = this.apiClientService.getGameId();
    this.socketService.message.subscribe(this.messageReceived);
  }

  messageReceived = ({ command, payload }) => {
    switch (command) {
      case 'playerCreated':
        this.players.push(payload);
        break;
      case 'playersList':
        this.werewolves = payload.werewolves;
        this.specialRoles = payload.specialRoles;
        this.villagers = payload.villagers;
        this.gameStarted = true;
        break;
      case 'updateLifeStatus':
        if (payload.role === 'werewolf') {
          this.werewolves.forEach(werewolf => {
            if (werewolf.playerId === payload.playerId) werewolf.lifeStatus = payload.lifeStatus;
          });
        }
        if (payload.role === 'villager') {
          this.villagers.forEach(villager => {
            if (villager.playerId === payload.playerId) villager.lifeStatus = payload.lifeStatus;
          });
        } else {
          this.specialRoles.forEach(specialRole => {
            if (specialRole.playerId === payload.playerId) specialRole.lifeStatus = payload.lifeStatus;
          });
        }
        break;
      case 'gameEnd':
        this.werewolves = payload.werewolves;
        this.specialRoles = payload.specialRoles;
        this.villagers = payload.villagers;
        this.gameEnded = true;
        break;
      default:
        break;
    }
  }

  startGame(): void {
    this.socketService.startGame(this.gameId);
  }

  startDayRound(): void {
    this.socketService.startRound(this.gameId, 'day');
  }

  startNightRound(): void {
    this.socketService.startRound(this.gameId, 'night');
  }

  startVote(): void {
    this.socketService.startVote(this.gameId);
  }

  killPlayer(player: Player): void {
    this.socketService.killPlayer(this.gameId, player.playerId);
  }

}
