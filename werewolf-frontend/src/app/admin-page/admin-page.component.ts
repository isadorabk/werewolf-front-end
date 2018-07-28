import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Player } from '../classes/player';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.sass']
})
export class AdminPageComponent implements OnInit {

  gameId: string;
  players: Player[];

  constructor(private apiClientService: ApiClientService) { }

  ngOnInit() {
  }

  startGame(): void {
    this.gameId = this.apiClientService.getGameId();
    this.apiClientService.getPlayers(this.gameId)
      .subscribe(data => {
        this.players = data;
      })
  }

}
