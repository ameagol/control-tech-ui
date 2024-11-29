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
import {
  BRANCH_OPTIONS,
  NEW_DEVICE_ERROR,
  NEW_DEVICE_SUCCESS,
  STATUS_OPTIONS,
  TYPE_OPTIONS
} from "../constants/device-options.constants";
import {MatDialog} from "@angular/material/dialog";
import {GlobalDialogComponent} from "../global-dialog/global-dialog.component";

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
    QrCodeModule,
    GlobalDialogComponent
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

  constructor(
      private dialog: MatDialog,
      private fb: FormBuilder,
      private deviceService: DeviceRegisterService) {
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

  openDialog(title: string, message: string): void {
    this.dialog.open(GlobalDialogComponent, {
      data: { title, message }
    });
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      this.deviceService.registerDevice(this.deviceForm.value).subscribe({
        next: (response) => {
          console.log('Device registered:', response);
          this.openDialog('Success', NEW_DEVICE_SUCCESS);
          this.qrCodeValue = `https://example.com/device/${this.deviceForm.value.serial}`;
        },
        error: (err) => {
          console.error('Error registering device:', err);
          this.openDialog('Error', NEW_DEVICE_ERROR);
        }
      });
    }
  }
}
