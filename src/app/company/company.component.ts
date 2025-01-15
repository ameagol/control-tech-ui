import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CompanyService} from "../services/company.service";
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
import {CompanyModel} from "../model/company.model";
import {MatTableModule} from "@angular/material/table";

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
        MatTableModule
    ],
    templateUrl: './company.component.html',
    styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit {
    registerForm: FormGroup;
    email: string = '';
    myCompanies: CompanyModel[] = [];
    selectedCompanyId: number | undefined;

    constructor(
        private fb: FormBuilder,
        private companyService: CompanyService,
        private authService: AuthService,
        private dialog: MatDialog
    ) {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(20)]],
        });
    }

    ngOnInit(): void {
        this.email = this.authService.getUserEmail();
        this.loadCompanies();
    }

    loadCompanies(): void {
        this.companyService.getCompaniesByUserId(this.email).subscribe((companies) => {
            this.myCompanies = companies;
        });
    }

    selectCompany(company: CompanyModel): void {
        this.selectedCompanyId = company.id;
        this.registerForm.patchValue({
            name: company.name,
        });
    }

    save(): void {
        if (this.registerForm.invalid) {
            return;
        }

        const companyData = <CompanyModel>{
            id: this.selectedCompanyId,
            user: {email: this.email},
            name: this.registerForm.get('name')?.value,
        };

        const saveMethod = this.selectedCompanyId
            ? this.companyService.updateCompany(companyData)
            : this.companyService.createCompany(companyData);

        saveMethod.subscribe({
            next: () => {
                this.openDialog('Success', 'Company updated successfully!');
                this.resetForm();
                this.loadCompanies();
            },
        });
    }

    resetForm(): void {
        delete this.selectedCompanyId;
        this.registerForm.reset();
    }

    openDialog(title: string, message: string): void {
        this.dialog.open(GlobalDialogComponent, {
            data: {title, message},
        });
    }
}
