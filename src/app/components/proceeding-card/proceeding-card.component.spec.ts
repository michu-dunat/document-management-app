import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingCardComponent } from './proceeding-card.component';

describe('ProceedingCardComponent', () => {
  let component: ProceedingCardComponent;
  let fixture: ComponentFixture<ProceedingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
