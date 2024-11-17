import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DeviceRegisterService {
    private apiUrl = 'http://localhost:3000/devices';

    constructor(private http: HttpClient) {}

    registerDevice(device: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, device);
    }
}
