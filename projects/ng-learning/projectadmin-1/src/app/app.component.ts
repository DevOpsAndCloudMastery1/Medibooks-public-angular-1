import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Medibooks';
  // Add the logout method
  logout() {
    // You can handle the logout logic here, like redirecting or clearing user data
    console.log("Logged out successfully.");
  }
}

