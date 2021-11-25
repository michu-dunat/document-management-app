import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStatusChangeDialogComponent } from './case-status-change-dialog.component';

describe('CaseStatusChangeDialogComponent', () => {
  let component: CaseStatusChangeDialogComponent;
  let fixture: ComponentFixture<CaseStatusChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseStatusChangeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStatusChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
