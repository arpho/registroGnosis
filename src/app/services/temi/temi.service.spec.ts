import { TestBed } from '@angular/core/testing';

import { TemiService } from './temi.service';

describe('TemiService', () => {
  let service: TemiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
