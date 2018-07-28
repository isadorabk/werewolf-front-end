import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../classes/player';

@Component({
  selector: 'app-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.sass']
})
export class PlayerListItemComponent implements OnInit {
  @Input() player: Player;
  
  constructor() { }

  ngOnInit() {
  }

}
