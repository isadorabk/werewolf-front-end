import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLandpageComponent } from './player-landpage.component';

describe('PlayerLandpageComponent', () => {
  let component: PlayerLandpageComponent;
  let fixture: ComponentFixture<PlayerLandpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerLandpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLandpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
