import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoListComponent } from './projeto-list.component';

describe('ProjetoListComponent', () => {
  let component: ProjetoListComponent;
  let fixture: ComponentFixture<ProjetoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
