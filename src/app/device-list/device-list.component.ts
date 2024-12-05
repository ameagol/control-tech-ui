import {Component, OnInit} from '@angular/core';
import {Device} from "../model/device.model";
import {DeviceListService} from "../services/device-list.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {QrCodeModule} from "ng-qrcode";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DISPLAY_COLUMNS} from "../constants/device-options.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatIcon,
    MatPaginatorModule,
    MatGridListModule,
    MatDividerModule,
    MatSortModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule,
    CommonModule,
    QrCodeModule,
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent implements OnInit {
  public devices: Device[] = [];
  public searchQuery: string = '';
  public showTable: boolean = false;
  displayedColumns: string[] = DISPLAY_COLUMNS;

  dataSource = new MatTableDataSource<Device>();

  constructor(private deviceListService: DeviceListService,
              private router: Router) {}

  ngOnInit() {
    this.fetchDevices();
  }

  fetchDevices(): void {
    this.deviceListService.findAll().subscribe(data => {
      if (data) {
        this.devices = data;
      }
    });
  }

  searchDevices(): void {
    if (this.searchQuery) {
      this.deviceListService.searchDevices(this.searchQuery)
          .subscribe(results => {
        this.devices = results;
      });
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.devices = [];
  }

  onToggleChange(event: MatSlideToggleChange): void {
    if (event.checked) {
      this.showTable = true;
      this.dataSource.data = this.devices;
    }else {
      this.showTable = false;
      this.dataSource.data = [];
    }
  }

  viewDeviceDetails(serial: string) {
    this.router.navigate(['/devices/register'], {
      queryParams: { serial: serial },
    });
  }
}

