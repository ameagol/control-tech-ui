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
    NEW_DEVICE_SUCCESS,
    DEVICE_GROUP_OPTIONS
} from "../constants/device-options.constants";
import {MatDialog} from "@angular/material/dialog";
import {GlobalDialogComponent} from "../global-dialog/global-dialog.component";
import {MatDividerModule} from "@angular/material/divider";
import {NgxPrintModule} from "ngx-print";
import {ActivatedRoute} from "@angular/router";
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device.model";
import {CompanyModel} from "../model/company.model";
import {CompanyService} from "../services/company.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxCurrencyDirective} from "ngx-currency";
import {StatusService} from "../services/status.service";
import {Status} from "../model/status.model";
import {environment} from "../../environments/environment";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-device-subscribe',
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
        NgxPrintModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxCurrencyDirective
    ],
    templateUrl: './device.component.html',
    styleUrl: './device.component.scss',
})
export class DeviceComponent implements OnInit {

    private uiUrl = environment.UI_HOST;
    deviceForm: FormGroup;
    deviceGroupOptions = DEVICE_GROUP_OPTIONS;
    statusOptions: Status[] = [];
    qrCodeValue: string = '';
    device: Device | null = null;
    companies: CompanyModel[] = [];
    today: Date = new Date();

    constructor(
        private dialog: MatDialog,
        private fb: FormBuilder,
        private deviceService: DeviceService,
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private statusService: StatusService,
        private authService: AuthService
    ) {
        this.deviceForm = this.fb.group({
            id: [],
            serial: ['', Validators.required],
            deviceGroup: ['', Validators.required],
            type: ['', Validators.required],
            status: ['', Validators.required],
            brand: ['', Validators.required],
            description: [''],
            channels: [0],
            company: [null, Validators.required],
            createdAt: [Date],
            cpuModel: [''],
            cpuGeneration: [1],
            cpuQuantity: [0],
            function: [''],
            memorySize: [''],
            memorySlots: [0],
            memoryType: [''],
            model: ['', Validators.required],
            patrim: ['', Validators.required],
            purchaseDate: [null],
            purchaseValue: [0],
            screenSize: [''],
            storage: [''],
            technology: ['']
        });
    }

    ngOnInit(): void {
        const email = this.authService.getUserEmail();
        if (email) {
            this.loadUserData(email);
        }

        const serial = this.route.snapshot.queryParamMap.get('serial');
        if (serial) {
            this.loadDevice(serial);
        }
    }

    private loadUserData(email: string): void {
        this.companyService.getCompaniesByUserId(email).subscribe({
            next: (companies: CompanyModel[]) => {
                this.companies = companies;
            },
        });

        this.statusService.getStatus(email).subscribe({
            next: (status: Status[]) => {
                this.statusOptions = status;
            },
        });
    }

    loadDevice(serial: string): void {
        this.deviceService.getDeviceBySerial(serial).subscribe({
            next: (device: Device) => {
                const interval = setInterval(() => {
                    if (this.companies.length > 0) {
                        clearInterval(interval);
                        const company = this.companies.find(c => c.name.toUpperCase() === device.companyName.toUpperCase()) || null;
                        this.deviceForm.patchValue({
                            ...device,
                            company: company
                        });
                        this.qrCodeValue = `${this.uiUrl}/devices/register?serial=${device.serial}`;
                    }
                }, 100);
            },
        });
    }

    onSubmit(): void {
        if (this.deviceForm.valid) {
            this.deviceService.registerDevice(this.deviceForm.value).subscribe({
                next: (response) => {
                    this.openDialog('Success', NEW_DEVICE_SUCCESS);
                    this.qrCodeValue = `${this.uiUrl}/devices/register?serial=${response.serial}`;
                },
            });
        }
    }

    openDialog(title: string, message: string): void {
        this.dialog.open(GlobalDialogComponent, {
            data: {title, message}
        });
    }
}
