import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {MatDividerModule} from "@angular/material/divider";
import {NgxPrintModule} from "ngx-print";
import {ActivatedRoute} from "@angular/router";
import {DeviceListService} from "../services/device-list.service";
import {Device} from "../model/device.model";
import {DeviceRegisterService} from "../services/device-register.service";

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
    MatDividerModule,
    CommonModule,
    FormsModule,
    QrCodeModule,
    GlobalDialogComponent,
    NgxPrintModule
  ],
  templateUrl: './device-register.component.html',
  styleUrl: './device-register.component.scss',
})
export class DeviceRegisterComponent implements OnInit{
  deviceForm: FormGroup;
  statusOptions = STATUS_OPTIONS;
  branchOptions = BRANCH_OPTIONS;
  typeOptions = TYPE_OPTIONS;
  qrCodeValue: string = '';
  device: Device | null = null;

  constructor(
      private dialog: MatDialog,
      private fb: FormBuilder,
      private deviceListService: DeviceListService,
      private deviceService: DeviceRegisterService,
      private route: ActivatedRoute) {
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

  ngOnInit(): void {
    const serial = this.route.snapshot.queryParamMap.get('serial');

    if (serial) {
      this.deviceListService.getDeviceBySerial(serial).subscribe({
        next: (device) => {
          this.deviceForm.patchValue(device);

          this.qrCodeValue = `https://example.com/device/${device.serial}`;
        },
        error: (err) => {
          console.error('Error fetching device data:', err);
        }
      });
    }
  }

  loadDevice(serial: string) {
    this.deviceListService.getDeviceBySerial(serial).subscribe({
      next: (device: Device) => {
        this.device = device;

        this.deviceForm.patchValue({
          name: device.name,
          fru: device.fru,
          serial: device.serial,
          type: device.type,
          status: device.status,
          owner: device.owner,
          email: device.email,
          invoice: device.invoice,
          branch: device.branch,
          description: device.description
        });

        this.qrCodeValue = `https://example.com/device/${device.serial}`;
      },
      error: (err) => {
        console.error('Error fetching device:', err);
        this.openDialog('Error', 'Failed to load device details');
      }
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
