import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { Device } from "../model/device.model";
import {API_DEVICES, PROD_HOST} from "../constants/device-options.constants";

@Injectable({
    providedIn: 'root'
})
export class DeviceRegisterService {
    private apiUrl = PROD_HOST + API_DEVICES;

    constructor(private http: HttpClient) {}

    registerDevice(device: Device): Observable<any> {
        return this.http.post(`${this.apiUrl}`, device);
    }
}
