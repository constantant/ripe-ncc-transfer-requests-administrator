import { TestBed, inject } from '@angular/core/testing';

import { TransfersApiService } from './transfers-api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TransfersApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransfersApiService,
        {
          provide: HttpClient,
          useValue: {
            get: () => of()
          }
        }
      ]
    });
  });

  it('should be created', inject([TransfersApiService], (service: TransfersApiService) => {
    expect(service).toBeTruthy();
  }));
});
