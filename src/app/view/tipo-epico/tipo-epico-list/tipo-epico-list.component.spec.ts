import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEpicoListComponent } from './tipo-epico-list.component';

describe('TipoEpicoListComponent', () => {
  let component: TipoEpicoListComponent;
  let fixture: ComponentFixture<TipoEpicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoEpicoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoEpicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
