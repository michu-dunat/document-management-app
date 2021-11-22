import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdversePartyAttorenyCardComponent } from './adverse-party-attoreny-card.component';

describe('AdversePartyAttorenyCardComponent', () => {
  let component: AdversePartyAttorenyCardComponent;
  let fixture: ComponentFixture<AdversePartyAttorenyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdversePartyAttorenyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdversePartyAttorenyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
