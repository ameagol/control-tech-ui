import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatOptionModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule
  ],
  standalone: true
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    // Implement your authentication logic here
    // For example, you might make an HTTP request to a backend server
    // to verify the credentials.
    // If authentication is successful, navigate to the desired page:
    this.router.navigate(['/devices']);
  }
}
