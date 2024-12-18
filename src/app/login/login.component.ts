import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
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
import {AuthService} from "../services/auth.service";
import {CommonModule} from "@angular/common";
import {UIRoutes} from "../constants/device-options.constants";

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
    FormsModule,
    MatError,
    CommonModule
  ],
  standalone: true
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
        response => {
          this.authService.storeToken(response.accessToken);
          this.router.navigate([UIRoutes.HOME]);
        },
    );
  }

    register() {
      this.router.navigate([UIRoutes.SUBSCRIBE]);
    }
}
