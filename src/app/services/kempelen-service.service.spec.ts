import { TestBed } from '@angular/core/testing';

import { KempelenService } from './kempelen-service.service';

describe('KempelenServiceService', () => {
  let service: KempelenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KempelenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
