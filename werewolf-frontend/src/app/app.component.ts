import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  day = "rgba(245, 203, 0)"
  night = "rgba(29, 88, 155)"
  bgColor = "#fafafa"
  round = 'waiting';

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.message.subscribe(this.messageReceived);
  }

  messageReceived = ({ command, payload }) => {
    switch (command) {
      case 'updateRound':
        this.round = payload;
        if (this.round === 'day') this.bgColor = this.day;
        if (this.round === 'night') this.bgColor = this.night;
        break;

      default:
        break;
    }
  }

}
