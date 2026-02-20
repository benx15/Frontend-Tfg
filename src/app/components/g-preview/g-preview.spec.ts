import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryPreviewComponent } from './g-preview.component';

describe('GalleryPreview', () => {
  let component: GalleryPreviewComponent;
  let fixture: ComponentFixture<GalleryPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryPreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
