import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtCardComponent } from './court-card.component';

describe('CourtCardComponent', () => {
  let component: CourtCardComponent;
  let fixture: ComponentFixture<CourtCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
