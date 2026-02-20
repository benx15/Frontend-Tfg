import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPreviewComponent } from './n-preview.component';

describe('NewsPreview', () => {
  let component: NewsPreviewComponent;
  let fixture: ComponentFixture<NewsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsPreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
