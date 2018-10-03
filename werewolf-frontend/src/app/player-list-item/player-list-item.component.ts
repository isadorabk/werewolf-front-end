import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketService } from '../socket.service';
import { Player } from '../classes/player';

@Component({
  selector: 'app-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.sass']
})
export class PlayerListItemComponent implements OnInit {
  @Input() player: Player;
  @Input() gameId: string;
  @Input() gameEnded;
  @Input() isVoted;
  @Input() accessoryLabel;
  @Output() submitted: EventEmitter<Player> = new EventEmitter<Player>();
  @Input() gameStarted;
  @Input() voterLifeStatus;

  card = {};


  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.card = this.player.card[this.player.role];
  }

  onSubmit(): void {
    if (!this.isVoted) {
      if (this.voterLifeStatus === "alive") this.player.toVote = 'voted';
      this.submitted.emit(this.player);
    }
  }

  getCSSClasses(): object {
    let cssClasses;
    if (this.player.lifeStatus === 'alive') {
      cssClasses = {
        'alive': true,
        'dead': false
      };
    } else if (this.player.lifeStatus === 'dead') {
      cssClasses = {
        'alive': false,
        'dead': true
      };
    }
    return cssClasses;
  }

}
