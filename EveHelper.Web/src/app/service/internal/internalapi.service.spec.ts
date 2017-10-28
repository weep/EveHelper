import { TestBed, inject } from '@angular/core/testing';

import { InternalapiService } from './internalapi.service';

describe('InternalapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternalapiService]
    });
  });

  it('should be created', inject([InternalapiService], (service: InternalapiService) => {
    expect(service).toBeTruthy();
  }));
});
