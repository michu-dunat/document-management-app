import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesCardComponent } from './entities-card.component';

describe('EntitiesCardComponent', () => {
  let component: EntitiesCardComponent;
  let fixture: ComponentFixture<EntitiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
