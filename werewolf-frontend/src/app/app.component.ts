import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  day = "rgba(245,203,0,0.5)"
  night = "rgba(29, 88, 155,0.5)"
  bgColor = "#fafafa"
  round = 'waiting';

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.getRound();
  }

  getRound(): void {
    setInterval(() => {
      this.round = this.socketService.getRound();
      if (this.round === 'day') this.bgColor = this.day;
      if (this.round === 'night') this.bgColor = this.night;
    }, 200);
  }

}
