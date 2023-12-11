import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicoComponent } from './epico.component';

describe('EpicoComponent', () => {
  let component: EpicoComponent;
  let fixture: ComponentFixture<EpicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
