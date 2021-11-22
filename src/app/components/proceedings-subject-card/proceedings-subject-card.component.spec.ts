import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedingsSubjectCardComponent } from './proceedings-subject-card.component';

describe('ProceedingsSubjectCardComponent', () => {
  let component: ProceedingsSubjectCardComponent;
  let fixture: ComponentFixture<ProceedingsSubjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedingsSubjectCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceedingsSubjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
