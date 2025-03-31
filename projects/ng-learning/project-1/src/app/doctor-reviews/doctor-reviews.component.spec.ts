import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DoctorReviewsComponent } from './doctor-reviews.component';

describe('DoctorReviewsComponent', () => {
  let component: DoctorReviewsComponent;
  let fixture: ComponentFixture<DoctorReviewsComponent>;
  let router: Router;

  const localStorageMock = {
    getItem: (key: string): string | null => {
      return key === 'doctorReviews' ? JSON.stringify([{ doctor: 'Dr. John Smith', rating: '5', text: 'Good', date: '2024-01-01' }]) : null;
    },
    setItem: (key: string, value: string) => {
      // Mock implementation
    },
    clear: () => {
      // Mock implementation
    },
  };

  beforeEach(async () => {
    spyOn(localStorageMock, 'getItem').and.callThrough();
    spyOn(localStorageMock, 'setItem').and.callThrough();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    await TestBed.configureTestingModule({
      imports: [DoctorReviewsComponent, FormsModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorReviewsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reviews on init', () => {
    spyOn(component, 'loadReviews');
    component.ngOnInit();
    expect(component.loadReviews).toHaveBeenCalled();
  });

  it('should load reviews for the selected doctor', () => {
    component.selectedDoctor = 'Dr. Emma Davis';
    component.loadReviews();
    expect(component.reviews).toEqual([]);
  });

  it('should submit a review and update the review list', () => {
    component.selectedDoctor = 'Dr. John Smith';
    component.newReview = { rating: '4', text: 'Great doctor!' };
    spyOn(component, 'loadReviews');
    component.submitReview();
    expect(component.loadReviews).toHaveBeenCalled();
    expect(component.newReview.text).toEqual('');
  });

  it('should navigate to home page', () => {
    spyOn(router, 'navigate');
    component.goToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show an alert if the review text is empty', () => {
    spyOn(window, 'alert');
    component.newReview.text = '   ';
    component.submitReview();
    expect(window.alert).toHaveBeenCalledWith('Please enter a review before submitting.');
  });
});
