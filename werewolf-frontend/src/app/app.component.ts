import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Werewolf Game';
  round = 'waiting';

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.message.subscribe(this.messageReceived);
  }

  messageReceived = ({ command, payload }) => {
    switch (command) {
      case 'updateRound':
        this.round = payload;
        break;
      default:
        break;
    }
  }

}
