import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from "../model/device.model";

@Injectable({
    providedIn: 'root'
})
export class DeviceRegisterService {
    private apiUrl = 'http://localhost:8081/apiv1/devices';

    constructor(private http: HttpClient) {}

    registerDevice(device: Device): Observable<any> {
        return this.http.post(`${this.apiUrl}`, device);
    }
}
