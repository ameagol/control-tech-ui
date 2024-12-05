import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceBIComponent } from './device-bi.component';

describe('DeviceBIComponent', () => {
  let component: DeviceBIComponent;
  let fixture: ComponentFixture<DeviceBIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceBIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceBIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
