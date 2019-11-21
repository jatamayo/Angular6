import { TestBed } from '@angular/core/testing';

import { AutentiationService } from './autentiation.service';

describe('AutentiationService', () => {
  let service: AutentiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
