import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.sass']
})
export class GamePageComponent implements OnInit {
  player;
  round: string;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.player = this.socketService.getPlayer();
    this.getRound();
  }

  getRound(): void {
    setInterval(() => {
      this.round = this.socketService.getRound();
    }, 200);
  }

}
