import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from "../model/device.model";

@Injectable({
    providedIn: 'root'
})
export class DeviceListService {
    private apiUrl = 'http://localhost:8081/apiv1/devices';

    constructor(private http: HttpClient) {}

    public findAll(): Observable<Device[]> {
        return this.http.get<Device[]>(this.apiUrl);
    }
}
