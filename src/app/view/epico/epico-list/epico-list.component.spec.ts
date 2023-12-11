import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicoListComponent } from './epico-list.component';

describe('EpicoListComponent', () => {
  let component: EpicoListComponent;
  let fixture: ComponentFixture<EpicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
