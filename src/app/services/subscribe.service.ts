import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import {API, PROD_HOST} from "../constants/device-options.constants";
import {Subscribe} from "../model/subscribe.model";

@Injectable({
    providedIn: 'root'
})
export class SubscribeService {
    private apiUrl = PROD_HOST + API.NEW_SUBSCRIBE;

    constructor(private http: HttpClient) {}

    newSubscribe(subscribe: Subscribe): Observable<Subscribe> {
        return this.http.post<Subscribe>(`${this.apiUrl}`, subscribe);
    }
}
