import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetorganizerComponent } from './fleetorganizer.component';

describe('FleetorganizerComponent', () => {
  let component: FleetorganizerComponent;
  let fixture: ComponentFixture<FleetorganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetorganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetorganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
