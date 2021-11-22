import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAndAdversePartyCardComponent } from './client-and-adverse-party-card.component';

describe('ClientAndAdversePartyCardComponent', () => {
  let component: ClientAndAdversePartyCardComponent;
  let fixture: ComponentFixture<ClientAndAdversePartyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAndAdversePartyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAndAdversePartyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
