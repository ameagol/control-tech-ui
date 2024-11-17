import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DeviceRegisterService} from "../services/device-register.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-device-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './device-register.component.html',
  styleUrl: './device-register.component.scss'
})
export class DeviceRegisterComponent {
  deviceForm: FormGroup;
  statusOptions: string[] = ['ok', 'quebrado', 'conserto', 'analise'];

  constructor(private fb: FormBuilder, private deviceService: DeviceRegisterService) {
    this.deviceForm = this.fb.group({
      fru: ['', Validators.required],
      serial: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      this.deviceService.registerDevice(this.deviceForm.value).subscribe({
        next: (response) => {
          console.log('Device registered:', response);
        },
        error: (err) => {
          console.error('Error registering device:', err);
        }
      });
    }
  }
}
