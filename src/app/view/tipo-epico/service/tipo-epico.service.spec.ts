import { TestBed } from '@angular/core/testing';

import { TipoEpicoService } from './tipo-epico.service';

describe('TipoEpicoService', () => {
  let service: TipoEpicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEpicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
