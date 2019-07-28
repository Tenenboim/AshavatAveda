import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFoundsComponent } from './user-founds.component';

describe('UserFoundsComponent', () => {
  let component: UserFoundsComponent;
  let fixture: ComponentFixture<UserFoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
