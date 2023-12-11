import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoHistoriaUsuarioComponent } from './tipo-historia-usuario.component';

describe('TipoHistoriaUsuarioComponent', () => {
  let component: TipoHistoriaUsuarioComponent;
  let fixture: ComponentFixture<TipoHistoriaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoHistoriaUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoHistoriaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
