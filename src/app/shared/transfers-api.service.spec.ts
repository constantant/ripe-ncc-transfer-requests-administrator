import { TestBed, inject } from '@angular/core/testing';

import { TransfersApiService } from './transfers-api.service';

describe('TransfersApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransfersApiService]
    });
  });

  it('should be created', inject([TransfersApiService], (service: TransfersApiService) => {
    expect(service).toBeTruthy();
  }));
});
