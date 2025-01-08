import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import {API} from "../constants/device-options.constants";
import {Subscribe} from "../model/subscribe.model";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SubscribeService {
    private apiUrl = environment.API_HOST + API.NEW_SUBSCRIBE;

    constructor(private http: HttpClient) {}

    newSubscribe(subscribe: Subscribe): Observable<Subscribe> {
        return this.http.post<Subscribe>(`${this.apiUrl}`, subscribe);
    }
}
