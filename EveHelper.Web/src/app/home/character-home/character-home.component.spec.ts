import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterHomeComponent } from './character-home.component';

describe('CharacterHomeComponent', () => {
  let component: CharacterHomeComponent;
  let fixture: ComponentFixture<CharacterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
