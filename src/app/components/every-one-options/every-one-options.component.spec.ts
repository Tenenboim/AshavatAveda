import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EveryOneOptionsComponent } from './every-one-options.component';

describe('EveryOneOptionsComponent', () => {
  let component: EveryOneOptionsComponent;
  let fixture: ComponentFixture<EveryOneOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EveryOneOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EveryOneOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
