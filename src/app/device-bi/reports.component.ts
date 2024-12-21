import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Device} from "../model/device.model";
import {Color, NgxChartsModule} from "@swimlane/ngx-charts";
import {CommonModule} from "@angular/common";
import {DeviceService} from "../services/device.service";

export const SCHEMA_CHART_COLORS = <Color>{
  domain: ['#1E3A8A', '#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
};

@Component({
  selector: 'app-device-bi',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {
  deviceList: Device[] = [];
  devicesByType: { name: string; value: number }[] = [];
  devicesByStatus: { name: string; value: number }[] = [];
  devicesByBrand: { name: string; value: number }[] = [];

  colorScheme: Color = SCHEMA_CHART_COLORS

  constructor(private deviceListService: DeviceService) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  private loadDevices(): void {
    this.deviceListService.findAll().subscribe({
      next: (devices) => {
        this.deviceList = devices;
        this.generateChartData();
      },
    });
  }

  private generateChartData(): void {
    this.devicesByType = this.aggregateData(this.deviceList, 'deviceGroup');
    this.devicesByStatus = this.aggregateData(this.deviceList, 'status');
    this.devicesByBrand = this.aggregateData(this.deviceList, 'brand');
  }

  private aggregateData(
      devices: Device[],
      field: keyof Device
  ): { name: string; value: number }[] {
    const counts: Record<string, number> = {};
    devices.forEach((device) => {
      const key = device[field] as string;
      counts[key] = (counts[key] || 0) + 1;
    });

    return Object.entries(counts).map(([key, value]) => ({
      name: key,
      value,
    }));
  }
}
