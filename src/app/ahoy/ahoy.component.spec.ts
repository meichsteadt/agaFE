import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhoyComponent } from './ahoy.component';

describe('AhoyComponent', () => {
  let component: AhoyComponent;
  let fixture: ComponentFixture<AhoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
