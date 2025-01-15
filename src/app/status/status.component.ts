import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatError, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";
import {AuthService} from "../services/auth.service";
import {GlobalDialogComponent} from "../global-dialog/global-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {Status} from "../model/status.model";
import {StatusService} from "../services/status.service";

@Component({
    selector: 'app-company',
    standalone: true,
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        MatError,
        CommonModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatTableModule,
    ],
    templateUrl: './status.component.html',
    styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {
    registerForm: FormGroup;
    email: string = '';
    allStatus: Status[] = [];
    selectedStatusId: number | undefined;

    constructor(
        private fb: FormBuilder,
        private statusService: StatusService,
        private authService: AuthService,
        private dialog: MatDialog
    ) {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(30)]],
        });
    }

    ngOnInit(): void {
        this.email = this.authService.getUserEmail();
        this.loadStatus();
    }

    loadStatus(): void {
        this.statusService.getStatus(this.email).subscribe((status) => {
            this.allStatus = status;
        });
    }

    selectStatus(status: Status): void {
        this.selectedStatusId = status.id;
        this.registerForm.patchValue({
            name: status.name,
        });
    }

    save(): void {
        if (this.registerForm.invalid) {
            return;
        }

        const statusData = <Status>{
            id: this.selectedStatusId,
            user: {email: this.email},
            name: this.registerForm.get('name')?.value,
        };

        const saveMethod = this.selectedStatusId
            ? this.statusService.updateStatus(statusData)
            : this.statusService.createStatus(statusData);

        saveMethod.subscribe({
            next: () => {
                this.openDialog('Success', 'Status updated successfully!');
                this.resetForm();
                this.loadStatus();
            },
        });
    }

    resetForm(): void {
        delete this.selectedStatusId;
        this.registerForm.reset();
    }

    openDialog(title: string, message: string): void {
        this.dialog.open(GlobalDialogComponent, {
            data: {title, message},
        });
    }
}
