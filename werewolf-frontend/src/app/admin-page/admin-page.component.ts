import { Component, OnInit } from '@angular/core';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from '../api-client.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.sass']
})
export class AdminPageComponent implements OnInit {
  faSun = faSun;
  faMoon = faMoon;
  gameStarted = false;
  gameId: string;
  players = [];


  constructor(private apiClientService: ApiClientService, private socketService: SocketService) { }

  ngOnInit() {
    this.gameId = this.apiClientService.getGameId(); //TODO: recfact with rout

    this.socketService.message.subscribe(this.messageReceived);

  }

  messageReceived = ({ command, payload }) => {
    switch (command) {
      case 'playerCreated':
        this.players.push(payload);
        break;
      
      case 'playersList':
        this.players = payload;
        break;
      
      case 'updateLifeStatus':
        this.players.forEach(player => {
          if (player.playerId === payload.playerId) {
            player.lifeStatus = payload.lifeStatus;
          }
        });
        break;
        
        
    
      default:
        break;
    }
  }

  startGame(): void {
    this.socketService.startGame(this.gameId);
    this.gameStarted = true;
  }

  startDayRound(): void {
    this.socketService.startRound(this.gameId, 'day');
  }

  startNightRound(): void {
    this.socketService.startRound(this.gameId, 'night');
  }

}
