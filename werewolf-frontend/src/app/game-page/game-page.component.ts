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
  voting = false;
  players;
  gameId;

  constructor(
    private socketService: SocketService,
    private client: ApiClientService
  ) { }

  ngOnInit() {
    this.socketService.message.subscribe(this.messageReceived);
    this.gameId = this.client.getGameId();
    console.log('game comp: ', this.gameId);
  }

  messageReceived = ({command, payload}) => {
    switch (command) {
      case 'playerInfo':
        this.player = payload;
        this.gameStarted = true;
        break;
      case 'updateLifeStatus':
        this.player.lifeStatus = payload;
        break;
      case 'gameEnd':
        this.gameEnded = true;
        this.player = payload;
        break;
      case 'startVote':
        this.voting = true;
        this.players = this.convertToVillagers(payload);
        break;
      case 'updateVotes':
        console.log(payload);
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

}
