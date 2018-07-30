import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  @Input() player;
  card = {};
  showCard = true;

  constructor() { }

  ngOnInit() {
    this.card = this.player.card[this.player.role]
  }

  toggleCard(): void {
    this.showCard = !this.showCard;
  }

  getLifeStatusCSS(): object {
    if (this.player.lifeStatus === 'alive') {
      return {
        'alive': true,
        'dead': false
      };
    }
    if (this.player.lifeStatus === 'dead') {
      return {
        'alive': false,
        'dead': true
      };
    }
  }
}
