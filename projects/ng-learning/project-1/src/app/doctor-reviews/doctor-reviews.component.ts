import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-reviews',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './doctor-reviews.component.html',
  styleUrl: './doctor-reviews.component.css'
})
export class DoctorReviewsComponent  implements OnInit {
  selectedDoctor: string = 'Dr. John Smith'; // Initial value
  reviews: any[] = [];
  newReview: any = { rating: '5', text: '' }; // Initialize newReview object
  private router = inject(Router);
  constructor(){}
  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    let storedReviews = JSON.parse(localStorage.getItem('doctorReviews') || '[]');
    this.reviews = storedReviews.filter((r: any) => r.doctor === this.selectedDoctor);
  }

  submitReview() {
    if (!this.newReview.text.trim()) {
      alert('Please enter a review before submitting.');
      return;
    }

    const review = {
      doctor: this.selectedDoctor,
      rating: this.newReview.rating,
      text: this.newReview.text,
      date: new Date().toLocaleDateString(),
    };

    let storedReviews = JSON.parse(localStorage.getItem('doctorReviews') || '[]');
    storedReviews.push(review);
    localStorage.setItem('doctorReviews', JSON.stringify(storedReviews));

    this.loadReviews(); // Refresh the review list
    this.newReview.text = ''; // Clear the review input
  }

  goToHome() {
    this.router.navigate(['/home']); // Adjust the route as needed
  }
 
}
