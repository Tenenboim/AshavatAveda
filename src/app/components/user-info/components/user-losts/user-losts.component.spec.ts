import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLostsComponent } from './user-losts.component';

describe('UserLostsComponent', () => {
  let component: UserLostsComponent;
  let fixture: ComponentFixture<UserLostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
