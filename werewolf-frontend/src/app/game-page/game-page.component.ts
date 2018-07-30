import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.sass']
})
export class GamePageComponent implements OnInit {
  player;
  gameStarted = false;

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.socketService.message.subscribe(this.messageReceived);
  }

  messageReceived = ({command, payload}) => {
    switch (command) {
      case 'playerInfo':
        this.player = payload;
        this.gameStarted = true;
        break;
      case 'updateLifeStatus':
        this.player.lifeStatus = payload;
        break;


    
      default:
        break;
    }
  }

}
