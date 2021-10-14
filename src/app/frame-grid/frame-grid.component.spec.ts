import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameGridComponent } from './frame-grid.component';

describe('FrameGridComponent', () => {
  let component: FrameGridComponent;
  let fixture: ComponentFixture<FrameGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
