import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompanyModel} from "../model/company.model";
import {API} from "../constants/device-options.constants";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private apiUrl = environment.API_HOST + API.COMPANIES;

    constructor(private http: HttpClient) {}

    getCompaniesByUserId(user_id: string): Observable<CompanyModel[]> {
        return this.http.get<CompanyModel[]>(`${this.apiUrl}/user/${user_id}`);
    }

    createCompany(company: CompanyModel): Observable<CompanyModel> {
        return this.http.post<CompanyModel>(`${this.apiUrl}`, company);
    }

    updateCompany(company: CompanyModel): Observable<CompanyModel> {
        return this.http.put<CompanyModel>(`${this.apiUrl}`, company);
    }
}
