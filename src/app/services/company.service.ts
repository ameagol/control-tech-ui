import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompanyModel} from "../model/company.model";
import {API, PROD_HOST} from "../constants/device-options.constants";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private apiUrl = PROD_HOST + API.COMPANIES;

    constructor(private http: HttpClient) {}

    getCompaniesByUserId(user_id: string): Observable<CompanyModel[]> {
        return this.http.get<CompanyModel[]>(`${this.apiUrl}/user/${user_id}`);
    }

    createCompany(company: CompanyModel): Observable<any> {
        return this.http.post<CompanyModel>(`${this.apiUrl}`, company);
    }

    updateCompany(company: CompanyModel): Observable<any> {
        return this.http.put<CompanyModel>(`${this.apiUrl}/${company.id}`, company);
    }
}
