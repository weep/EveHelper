import { TestBed, inject } from '@angular/core/testing';

import { EveapiService } from './eveapi.service';

describe('EveapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EveapiService]
    });
  });

  it('should be created', inject([EveapiService], (service: EveapiService) => {
    expect(service).toBeTruthy();
  }));
});
