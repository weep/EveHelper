import { TestBed, async, inject } from '@angular/core/testing';

import { CharacterSelecterGuard } from './character-selecter.guard';

describe('CharacterSelecterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterSelecterGuard]
    });
  });

  it('should ...', inject([CharacterSelecterGuard], (guard: CharacterSelecterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
