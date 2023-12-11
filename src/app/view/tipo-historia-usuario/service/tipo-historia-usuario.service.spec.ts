import { TestBed } from '@angular/core/testing';

import { TipoHistoriaUsuarioService } from './tipo-historia-usuario.service';

describe('TipoHistoriaUsuarioService', () => {
  let service: TipoHistoriaUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoHistoriaUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
