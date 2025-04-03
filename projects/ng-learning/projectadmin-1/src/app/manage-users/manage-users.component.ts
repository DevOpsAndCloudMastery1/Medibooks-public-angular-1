import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule for ngModel

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ✅ Include FormsModule here
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  users = [
    { name: "John Doe", email: "john.doe@example.com", status: "Active" },
    { name: "Jane Smith", email: "jane.smith@example.com", status: "Inactive" },
    { name: "Mark Johnson", email: "mark.johnson@example.com", status: "Active" },
    { name: "Olivia Wilson", email: "olivia.wilson@example.com", status: "Inactive" },
    { name: "Sophia Martinez", email: "sophia.martinez@example.com", status: "Active" }
  ];

  statusFilter = '';
  emailFilter = '';

  get filteredUsers() {
    return this.users.filter(user =>
      (this.statusFilter ? user.status === this.statusFilter : true) &&
      user.email.toLowerCase().includes(this.emailFilter.toLowerCase())
    );
  }

  toggleAccountStatus(index: number) {
    const filteredUser = this.filteredUsers[index];
    const user = this.users.find(u => u.email === filteredUser.email); // ✅ Find the user in the original array

    if (user) {
      user.status = user.status === "Active" ? "Inactive" : "Active";
      alert(`${user.name}'s account has been ${user.status.toLowerCase()}d.`);
    }
  } 
}
