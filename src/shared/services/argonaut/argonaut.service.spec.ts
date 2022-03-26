import { TestBed } from '@angular/core/testing';

import { ArgonautService } from './argonaut.service';

describe('ArgonautService', () => {
  let service: ArgonautService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArgonautService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
