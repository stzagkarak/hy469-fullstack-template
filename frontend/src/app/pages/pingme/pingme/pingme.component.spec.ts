import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingmeComponent } from './pingme.component';

describe('PingmeComponent', () => {
  let component: PingmeComponent;
  let fixture: ComponentFixture<PingmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PingmeComponent]
    });
    fixture = TestBed.createComponent(PingmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
