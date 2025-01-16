import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable } from 'rxjs';
import { Device } from "../model/device.model";
import {API} from "../constants/device-options.constants";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    private apiUrl = environment.API_HOST + API.DEVICES;

    constructor(private http: HttpClient) {}

    public findByUserEmail(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}`);
}

    public getDeviceBySerial(serial: string): Observable<Device> {
        return this.http.get<Device>(`${this.apiUrl}/serial/${serial}`);
    }

    public searchDevices(query: string): Observable<Device[]> {
        return this.http.post<Device[]>(`${this.apiUrl}/search`, { search: query });
    }

    registerDevice(device: Device): Observable<Device> {
        return this.http.post<Device>(`${this.apiUrl}`, device);
    }
}
