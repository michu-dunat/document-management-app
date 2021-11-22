import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgingPanelCardComponent } from './judging-panel-card.component';

describe('JudgingPanelCardComponent', () => {
  let component: JudgingPanelCardComponent;
  let fixture: ComponentFixture<JudgingPanelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgingPanelCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgingPanelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
