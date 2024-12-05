import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import { Device } from "../model/device.model";
import {API_DEVICES, PROD_HOST} from "../constants/device-options.constants";

@Injectable({
    providedIn: 'root'
})
export class DeviceListService {
    private apiUrl = PROD_HOST + API_DEVICES;

    constructor(private http: HttpClient) {}

    public findAll(): Observable<Device[]> {
        return this.http.get<Device[]>(this.apiUrl);
    }

    public getDeviceBySerial(serial: string): Observable<Device> {
        return this.http.get<Device>(`${this.apiUrl}/serial/${serial}`);
    }

    public searchDevices(query: string): Observable<Device[]> {
        return this.http.post<Device[]>(`${this.apiUrl}/search`, { search: query });
    }
}
