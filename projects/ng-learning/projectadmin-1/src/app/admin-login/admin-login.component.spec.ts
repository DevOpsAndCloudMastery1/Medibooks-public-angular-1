import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLoginComponent } from './admin-login.component';
import { RouterTestingModule } from '@angular/router/testing'; // Import necessary module
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed for form handling
import { CommonModule } from '@angular/common';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoginComponent, FormsModule, CommonModule, RouterTestingModule] // Add required imports here
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleLogin when the form is submitted', () => {
    const loginSpy = jest.spyOn(component, 'handleLogin');
    const form = fixture.nativeElement.querySelector('form');
    form.submit();
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should call handleForgotPassword when the forgot password link is clicked', () => {
    const forgotPasswordSpy = jest.spyOn(component, 'handleForgotPassword');
    const forgotLink = fixture.nativeElement.querySelector('.forgot-password');
    forgotLink.click();
    expect(forgotPasswordSpy).toHaveBeenCalled();
  });
});
