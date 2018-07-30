import { Component, OnInit, Input } from '@angular/core';
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
  card = {};
  
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.card = this.player.card[this.player.role]
  }

  killPlayer(): void {
    this.socketService.killPlayer(this.gameId, this.player.playerId);
  }

  getCSSClasses(flag: string): object {
    let cssClasses;
    switch (flag) {
      case 'lifeStatus':
        if (this.player.lifeStatus === 'alive') {
          cssClasses = {
            'alive': true,
            'dead': false
          };
        }
        if (this.player.lifeStatus === 'dead') {
          cssClasses = {
            'alive': false,
            'dead': true
          };
        }
        return cssClasses;
      default:
        break;
    }
  }

}
