import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../classes/player';

@Component({
  selector: 'app-player-voting',
  templateUrl: './player-voting.component.html',
  styleUrls: ['./player-voting.component.sass']
})
export class PlayerVotingComponent implements OnInit {
  @Input() players;
  isVoted = false;
  vote = 'vote';

  constructor() { }

  ngOnInit() {
  }

  voteToKill(player: Player) {
    this.vote = 'voted';
    this.isVoted = true;
    console.log('parent', player);
    // this.socketService.voteToKill(this.gameId, this.player.playerId);
  }

}
