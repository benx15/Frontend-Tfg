import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkerSidebarComponent } from './worker-sidebar.component';


describe('Sidebar', () => {
  let component: WorkerSidebarComponent;
  let fixture: ComponentFixture<WorkerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
