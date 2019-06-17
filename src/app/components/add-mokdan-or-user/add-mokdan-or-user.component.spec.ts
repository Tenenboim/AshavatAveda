import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMokdanOrUserComponent } from './add-mokdan-or-user.component';

describe('AddMokdanOrUserComponent', () => {
  let component: AddMokdanOrUserComponent;
  let fixture: ComponentFixture<AddMokdanOrUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMokdanOrUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMokdanOrUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
