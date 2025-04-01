import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeAll(() => {
    // Mock only the necessary parts of window.location
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { assign: jest.fn() } // Mock only 'assign'
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent, RouterTestingModule], // Keep component in imports for standalone
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "Admin Dashboard"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content h1')?.textContent).toContain('Admin Dashboard');
  });

  it('should call alert and attempt redirection on logout', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const locationSpy = jest.spyOn(window.location, 'assign');

    const logoutButton = fixture.nativeElement.querySelector('.btn-logout') as HTMLButtonElement;
    expect(logoutButton).toBeTruthy();

    logoutButton.click(); // Simulate click event
    fixture.detectChanges(); // Ensure updates are applied

    expect(alertSpy).toHaveBeenCalledWith('You have logged out!');
    expect(locationSpy).toHaveBeenCalledWith('login.html');

    alertSpy.mockRestore();
    locationSpy.mockRestore();
  });
});
