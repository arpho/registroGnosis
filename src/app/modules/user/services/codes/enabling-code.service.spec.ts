import { TestBed } from '@angular/core/testing';

import { EnablingCodeService } from './enabling-code.service';

describe('EnablingCodeService', () => {
  let service: EnablingCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnablingCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
