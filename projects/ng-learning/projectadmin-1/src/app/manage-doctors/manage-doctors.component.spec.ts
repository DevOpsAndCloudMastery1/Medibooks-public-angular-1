import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageDoctorsComponent } from './manage-doctors.component';

describe('ManageDoctorsComponent', () => {
  let component: ManageDoctorsComponent;
  let fixture: ComponentFixture<ManageDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDoctorsComponent, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a doctor', () => {
    component.doctorName = 'Dr. Test';
    component.specialization = 'Test Specialist';
    component.experience = '5 years';
    component.availability = 'Available';
    component.photo = new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' });

    component.addDoctor(new Event('submit'));

    expect(component.doctors.length).toBeGreaterThan(0);
  }); 
});
