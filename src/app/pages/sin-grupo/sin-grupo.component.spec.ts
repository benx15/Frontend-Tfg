import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinGrupoComponent} from './sin-grupo.component';

describe('SinGrupoComponent', () => {
  let component: SinGrupoComponent;
  let fixture: ComponentFixture<SinGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinGrupoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
