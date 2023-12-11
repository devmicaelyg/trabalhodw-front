import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTarefaComponent } from './tipo-tarefa.component';

describe('TipoTarefaComponent', () => {
  let component: TipoTarefaComponent;
  let fixture: ComponentFixture<TipoTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoTarefaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
