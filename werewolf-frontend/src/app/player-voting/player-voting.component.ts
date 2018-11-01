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
  @Input() player;
  isVoted = false;
  vote = 'vote';

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

  voteToKill(votedPLayer: Player) {
    this.isVoted = true;
    if (this.player.lifeStatus === 'alive') {
      this.vote = 'voted';
      this.socketService.voteToKill(votedPLayer.playerId, this.player.playerId);
    }
  }

}
