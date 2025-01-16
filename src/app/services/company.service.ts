import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompanyModel} from "../model/company.model";
import {API} from "../constants/device-options.constants";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private apiUrl = environment.API_HOST + API.COMPANIES;

    constructor(private http: HttpClient, private authService: AuthService) {}

    getCompaniesByUserId(): Observable<CompanyModel[]> {
        return this.http.get<CompanyModel[]>(`${this.apiUrl}`,);
    }

    createCompany(company: CompanyModel): Observable<CompanyModel> {
        return this.http.post<CompanyModel>(`${this.apiUrl}`, company);
    }

    updateCompany(company: CompanyModel): Observable<CompanyModel> {
        return this.http.put<CompanyModel>(`${this.apiUrl}`, company);
    }
}
