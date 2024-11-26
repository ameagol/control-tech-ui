import {Component, OnInit} from '@angular/core';
import {Device} from "../model/device.model";
import {DeviceListService} from "../services/device-list.service";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {QrCodeModule} from "ng-qrcode";

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
    CommonModule,
      QrCodeModule,
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent implements OnInit {
  public devices: Device[] = [];

  constructor(private deviceListService: DeviceListService) {}

  ngOnInit() {
    this.deviceListService.findAll().subscribe(data => {
      if(data){
        this.devices = data;
      }
    });
  }
}

