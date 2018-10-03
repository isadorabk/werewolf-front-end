import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../classes/player';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-player-voting',
  templateUrl: './player-voting.component.html',
  styleUrls: ['./player-voting.component.sass']
})
export class PlayerVotingComponent implements OnInit {
  @Input() players;
  @Input() gameId;
  isVoted = false;
  vote = 'vote';

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

  voteToKill(player: Player) {
    this.vote = 'voted';
    this.isVoted = true;
    this.socketService.voteToKill(this.gameId, player.playerId);
  }

}
