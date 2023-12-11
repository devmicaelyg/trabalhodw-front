import { TestBed } from '@angular/core/testing';

import { EpicoService } from './epico.service';

describe('EpicoService', () => {
  let service: EpicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
