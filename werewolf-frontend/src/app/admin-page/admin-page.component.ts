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

  gameId: string;
  players: Player[];
  faSun = faSun;
  faMoon = faMoon;
  gameHasStarted = false;

  constructor(private apiClientService: ApiClientService, private socketService: SocketService) { }

  ngOnInit() {
    this.gameId = this.apiClientService.getGameId();
  }

  startGame(): void {
    this.apiClientService.getPlayers(this.gameId)
      .subscribe(data => {
        this.players = data;
        this.socketService.startGame(this.gameId);
        this.gameStarted();
      })
  }

  gameStarted(): void {
    this.gameHasStarted = true;
  }

}
