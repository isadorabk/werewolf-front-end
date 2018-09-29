import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.sass']
})
export class GamePageComponent implements OnInit {
  player;
  gameStarted = false;
  gameEnded = false;

  constructor(
    private socketService: SocketService,
    private apiClientService: ApiClientService,
  ) { }

  ngOnInit() {
    let game = JSON.parse(localStorage.getItem('game'));
    if(game && game.hasOwnProperty('gameCode') && !game.adminCode) {
      const playerId = { playerId: game.playerId };
      this.socketService.initSocket(game.gameCode, playerId);
    } else {
      game = this.apiClientService.getGame();
      if (game.gameCode) localStorage.setItem('game',JSON.stringify(game));
      else this.gameEnded = true;
    }
    this.socketService.message.subscribe(this.messageReceived);
    
  }

  messageReceived = ({command, payload}) => {
    switch (command) {
      case 'playerInfo':
        this.player = payload.playerInfo;
        if (payload.started) this.gameStarted = true;
        break;
      case 'updateLifeStatus':
        this.player.lifeStatus = payload;
        break;
      case 'gameEnd':
        this.gameEnded = true;
        //TODO: Update right payload
        this.player = payload;
        localStorage.setItem('game',undefined);
        break;
      default:
        break;
    }
  }

}
