import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { SocketService } from '../socket.service';
import { NewGame } from '../classes/newGame';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.sass']
})
export class LandpageComponent implements OnInit {
  newGame: NewGame;
  gameId: string;
  adminId: string;

  constructor(
    private router: Router,
    private apiClientService: ApiClientService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    // this.ioConnection = this.socketService.onMessage()
    //   .subscribe((message: Message) => {
    //     this.messages.push(message);
    //   });

    // this.socketService.onEvent(Event.CONNECT)
    //   .subscribe(() => {
    //     console.log('connected');
    //   });

    // this.socketService.onEvent(Event.DISCONNECT)
    //   .subscribe(() => {
    //     console.log('disconnected');
    //   });
  }

  createGame(): void {
    this.apiClientService.createGame()
      .subscribe(data => {
        this.newGame = data;
        this.gameId = this.newGame.gameId;
        this.adminId = this.newGame.adminId;
      });
    // this.socketService.initSocket();
    this.initIoConnection();
  }

  joinPage() {
    this.router.navigateByUrl('/join');
  }

}
