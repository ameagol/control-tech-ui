import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Device } from "../model/device.model";
import {AuthService} from "./auth.service";
import {API_DEVICES} from "../constants/device-options.constants";

@Injectable({
    providedIn: 'root'
})
export class DeviceRegisterService {
    private apiUrl = 'http://localhost:8081' + API_DEVICES;

    constructor(private http: HttpClient) {}

    registerDevice(device: Device): Observable<any> {
        return this.http.post(`${this.apiUrl}`, device);
    }
}
