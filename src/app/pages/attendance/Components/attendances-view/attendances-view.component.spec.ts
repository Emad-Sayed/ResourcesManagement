import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancesViewComponent } from './attendances-view.component';

describe('AttendancesViewComponent', () => {
  let component: AttendancesViewComponent;
  let fixture: ComponentFixture<AttendancesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
