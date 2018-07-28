import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.sass']
})
export class LandpageComponent implements OnInit {

  gameId: string;

  constructor(
    private router: Router,
    private apiClientService: ApiClientService,
    private socketService: SocketService
  ) { }

  ngOnInit() { }

  private initIoConnection(gameId: string, adminCode?): void {
    this.socketService.initSocket(gameId, adminCode)
  } 

  createGame(): void {
    this.apiClientService.createGame()
      .subscribe(data => {
        this.gameId = data.gameId;
        this.apiClientService.sendGameId(this.gameId);
        this.initIoConnection(data.gameId, data.adminCode);
        this.router.navigateByUrl('/admin');
      })
  }

  joinPage() {
    this.router.navigateByUrl('/join');
  }

}
