import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Device} from "../model/device.model";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {CommonModule} from "@angular/common";
import {DeviceListService} from "../services/device-list.service";
import {SCHEMA_CHART_COLORS} from "../constants/device-options.constants";

@Component({
  selector: 'app-device-bi',
  standalone: true,
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './device-bi.component.html',
  styleUrl: './device-bi.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DeviceBIComponent implements OnInit {
  deviceList: Device[] = [];
  devicesByType: { name: string; value: number }[] = [];
  devicesByStatus: { name: string; value: number }[] = [];
  devicesByBranch: { name: string; value: number }[] = [];

  colorScheme = SCHEMA_CHART_COLORS;

  constructor(private deviceListService: DeviceListService) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  private loadDevices(): void {
    this.deviceListService.findAll().subscribe({
      next: (devices) => {
        this.deviceList = devices;
        this.generateChartData();
      },
      error: (err) => {
        console.error('Error loading devices:', err);
      },
    });
  }

  private generateChartData(): void {
    this.devicesByType = this.aggregateData(this.deviceList, 'type');
    this.devicesByStatus = this.aggregateData(this.deviceList, 'status');
    this.devicesByBranch = this.aggregateData(this.deviceList, 'branch');
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
