import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLandpageComponent } from './admin-landpage.component';

describe('AdminLandpageComponent', () => {
  let component: AdminLandpageComponent;
  let fixture: ComponentFixture<AdminLandpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLandpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLandpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
