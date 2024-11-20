import {Component, OnInit} from '@angular/core';
import {Device} from "../model/device.model";
import {DeviceListService} from "../services/device-list.service";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fru', 'serial', 'type', 'status'];
  public devices: Device[] = [];

  constructor(private deviceListService: DeviceListService) {
  }

  ngOnInit() {
    this.deviceListService.findAll().subscribe(data => {
      this.devices = data;
    });
  }

}
