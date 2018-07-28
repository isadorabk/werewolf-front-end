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
        this.players = this.assignWerewolves(data);
      })
  }

  assignWerewolves(data): Player[] {
    let playersRole = data.slice();
    const numOfPlayers = playersRole.length;
    const werewolvesRatio = 4;
    const numOfWerewolves = Math.floor(numOfPlayers / werewolvesRatio);
    const werewolves = this.getRandomElements(playersRole, numOfWerewolves);
    playersRole.forEach(player => {
      werewolves.forEach(werewolf => {
        if (werewolf.playerId === player.playerId) player.role = 'werewolf';
      });
    });
    return playersRole;
  }

getRandomElements(arr, n): Player[] {
  let result = new Array(n);
  let len = arr.length;
  let taken = new Array(len);
  if (n > len) throw new RangeError('getRandomElements: more elements taken than avaiable')
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}



}
