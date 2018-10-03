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
  @Input() player;
  isVoted = false;
  vote = 'vote';

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

  voteToKill(player: Player) {
    if (this.player.lifeStatus === 'alive') {
      this.vote = 'voted';
      this.isVoted = true;
      console.log(this.player);
      this.socketService.voteToKill(this.gameId, player.playerId, this.player.playerId);
    }
  }

}
