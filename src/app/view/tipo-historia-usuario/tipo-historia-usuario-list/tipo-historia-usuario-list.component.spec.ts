import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoHistoriaUsuarioListComponent } from './tipo-historia-usuario-list.component';

describe('TipoHistoriaUsuarioListComponent', () => {
  let component: TipoHistoriaUsuarioListComponent;
  let fixture: ComponentFixture<TipoHistoriaUsuarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoHistoriaUsuarioListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoHistoriaUsuarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
