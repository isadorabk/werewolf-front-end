import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { ApiClientService } from '../api-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.sass']
})
export class GamePageComponent implements OnInit {
  player;
  gameStarted = false;
  gameEnded = false;
  voting = false;
  players;

  constructor(
    private socketService: SocketService,
    private apiClientService: ApiClientService,
    private router: Router,
  ) { }

  ngOnInit() {
    let game = this.apiClientService.getGame();
    if(game && game.gameCode && !game.adminCode) {
      localStorage.setItem('game',JSON.stringify(game));
    } else {
      if (localStorage.getItem('game') && localStorage.getItem('game')!=='undefined') game = JSON.parse(localStorage.getItem('game'));
      if (game.gameCode) {
        const playerId = { playerId: game.playerId };
        this.socketService.initSocket(game.gameCode, playerId);
      } else this.gameEnded = true;
    }
    this.socketService.message.subscribe(this.messageReceived);
  }

  messageReceived = ({command, payload}) => {
    switch (command) {
      case 'playerInfo':
        this.player = payload.playerInfo;
        if (payload.started) this.gameStarted = true;
        if (payload.ended) this.gameEnded = true;
        if (this.gameEnded) localStorage.setItem('game',null);
        break;
      case 'updateLifeStatus':
        this.player.lifeStatus = payload;
        break;
      case 'gameEnd':
        this.gameEnded = true;
        //TODO: Update right payload
        this.player = payload;
        localStorage.setItem('game',null);
        break;
      case 'startVote':
        this.voting = true;
        this.players = this.convertToVillagers(payload);
        break;
      case 'finishVote':
        this.voting = payload;
        break;
      default:
        break;
    }
  }

  convertToVillagers = players => {
    for (let id in players) {
      if (players.hasOwnProperty(id)) {
        players[id].role = 'villager';
      }
    }
    return players;
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

}
