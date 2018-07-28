import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.sass']
})
export class GamePageComponent implements OnInit {
  role;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.role = this.socketService.getRole();
  }

}
