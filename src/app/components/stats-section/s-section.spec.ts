import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSectionComponent } from './s-section.component';

describe('StatsSection', () => {
  let component: StatsSectionComponent;
  let fixture: ComponentFixture<StatsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
