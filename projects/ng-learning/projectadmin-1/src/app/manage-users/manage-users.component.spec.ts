import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageUsersComponent } from './manage-users.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ManageUsersComponent', () => {
  let component: ManageUsersComponent;
  let fixture: ComponentFixture<ManageUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUsersComponent], // ✅ Use declarations instead of imports
      imports: [FormsModule, CommonModule, RouterTestingModule], // ✅ Use RouterTestingModule
      schemas: [NO_ERRORS_SCHEMA] // ✅ Ignore unknown elements
    }).compileComponents();

    fixture = TestBed.createComponent(ManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ✅ Ensure initial UI rendering
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle account status correctly', () => {
    component.toggleAccountStatus(0);
    fixture.detectChanges();
    expect(component.users[0].status).toBe('Inactive');

    component.toggleAccountStatus(0);
    fixture.detectChanges();
    expect(component.users[0].status).toBe('Active');
  });
});
