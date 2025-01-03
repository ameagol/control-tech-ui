import {Injectable} from "@angular/core";
import {API, PROD_HOST} from "../constants/device-options.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../model/status.model";

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    private apiUrl = PROD_HOST + API.STATUS;

    constructor(private http: HttpClient) {}

    getStatus(email: String): Observable<Status[]> {
        return this.http.get<Status[]>(`${this.apiUrl}/user/${email}`);
    }

    createStatus(status: Status): Observable<Status> {
        return this.http.post<Status>(`${this.apiUrl}`, status);
    }

    updateStatus(status: Status): Observable<Status> {
        return this.http.put<Status>(`${this.apiUrl}/${status.id}`, status);
    }
}
