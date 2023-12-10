import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEpicoComponent } from './tipo-epico.component';

describe('TipoEpicoComponent', () => {
  let component: TipoEpicoComponent;
  let fixture: ComponentFixture<TipoEpicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoEpicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoEpicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
