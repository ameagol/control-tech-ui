import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatError, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Subscribe} from "../model/subscribe.model";
import {SubscribeService} from "../services/subscribe.service";
import {Router} from "@angular/router";
import {UIRoutes} from "../constants/device-options.constants";

@Component({
  selector: 'app-subscribe',
  standalone: true,
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
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder,
              private subscribeService: SubscribeService,
              private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      company: ['', [Validators.required, Validators.maxLength(30)]],
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form.';
      return;
    }

    const subscribeData: Subscribe = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      company: this.registerForm.get('company')?.value,
    };

    this.subscribeService.newSubscribe(subscribeData).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Registration Failed!';
        this.successMessage = '';
      }
    });
  }

  login() {
    this.router.navigate([UIRoutes.LOGIN]);
  }
}
