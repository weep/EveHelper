import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningLedgerComponent } from './mining-ledger.component';

describe('MiningLedgerComponent', () => {
  let component: MiningLedgerComponent;
  let fixture: ComponentFixture<MiningLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiningLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
