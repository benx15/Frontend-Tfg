import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFeedComponent } from './activity-feed';

describe('ActivityFeed', () => {
  let component: ActivityFeedComponent;
  let fixture: ComponentFixture<ActivityFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityFeedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
