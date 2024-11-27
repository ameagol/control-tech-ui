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

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    registerDevice(device: Device): Observable<any> {
        const token = this.authService.getToken();
        if(token) {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            return this.http.post(`${this.apiUrl}`, device, { headers });
        }

        return of({})
    }
}
