import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent, RouterTestingModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(window, 'alert'); // Mock alert
    spyOn(window.location, 'assign'); // Mock redirection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "Admin Dashboard"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content h1')?.textContent).toContain('Admin Dashboard');
  });

  it('should call alert and attempt redirection on logout', () => {
    const logoutButton = fixture.nativeElement.querySelector('.btn-logout') as HTMLButtonElement;
    expect(logoutButton).toBeTruthy();

    logoutButton.click(); // Simulate click
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('You have logged out!');
    expect(window.location.assign).toHaveBeenCalledWith('login.html');
  });
});
