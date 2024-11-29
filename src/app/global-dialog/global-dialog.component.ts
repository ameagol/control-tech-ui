import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-global-dialog',
  standalone: true,
  imports: [
    MatButtonModule,MatDialogContent, MatDialogTitle
  ],
  templateUrl: './global-dialog.component.html',
  styleUrl: './global-dialog.component.scss'
})
export class GlobalDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
