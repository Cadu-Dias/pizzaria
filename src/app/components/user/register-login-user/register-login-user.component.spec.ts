import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginUserComponent } from './register-login-user.component';

describe('RegisterLoginUserComponent', () => {
  let component: RegisterLoginUserComponent;
  let fixture: ComponentFixture<RegisterLoginUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLoginUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterLoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
