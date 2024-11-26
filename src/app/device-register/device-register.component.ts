import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DeviceRegisterService} from "../services/device-register.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {QrCodeModule} from "ng-qrcode";
import {MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {BRANCH_OPTIONS, STATUS_OPTIONS, TYPE_OPTIONS} from "../constants/device-options.constants";

@Component({
  selector: 'app-device-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    CommonModule,
    FormsModule,
    QrCodeModule
  ],
  templateUrl: './device-register.component.html',
  styleUrl: './device-register.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DeviceRegisterComponent {
  deviceForm: FormGroup;
  statusOptions = STATUS_OPTIONS;
  branchOptions = BRANCH_OPTIONS;
  typeOptions = TYPE_OPTIONS;
  qrCodeValue: string = '';

  constructor(private fb: FormBuilder, private deviceService: DeviceRegisterService) {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      fru: ['', Validators.required],
      serial: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      owner: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      invoice: ['', Validators.required],
      branch: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      console.log(this.deviceForm.value);
      this.deviceService.registerDevice(this.deviceForm.value).subscribe({
        next: (response) => {
          console.log('Device registered:', response);
        },
        error: (err) => {
          console.error('Error registering device:', err);
        }
      });

      // Generate QR code based on device details (e.g., serial)
      this.qrCodeValue = `https://example.com/device/${this.deviceForm.value.serial}`;
    }
  }
}
