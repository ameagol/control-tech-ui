import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable, throwError} from 'rxjs';

import { catchError } from 'rxjs/operators';
import {TokenModel} from "../model/token.model";
import {API} from "../constants/device-options.constants";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.API_HOST + API.LOGIN;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkToken());

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<TokenModel> {
        const body = { email, password };

        return this.http.post<TokenModel>(this.apiUrl, body).pipe(
            map(response => {
                if (response?.accessToken) {
                    this.storeToken(response.accessToken);
                }
                return response;
            }),
            catchError(error => {
                return throwError(() => new Error(`Login failed: ${error.message}`));
            })
        );
    }

    storeToken(token: string): void {
        sessionStorage.setItem('accessToken', token);
        this.isAuthenticatedSubject.next(true);
    }

    getToken(): string | null {
        return this.getSessionItem('accessToken');
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    logout(): void {
        sessionStorage.removeItem('accessToken');
        this.isAuthenticatedSubject.next(false);
    }

    getUserEmail(): string {
        const decodedToken = this.getDecodedToken();
        return decodedToken?.sub || 'Unknown User';
    }

    private getSessionItem(key: string): string | null {
        return typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
    }

    private checkToken(): boolean {
        const decodedToken = this.getDecodedToken();
        const currentTime = Math.floor(Date.now() / 1000);

        return decodedToken
            ? (decodedToken.exp > currentTime ? true : (this.logout(), false))
            : (this.logout(), false);
    }

    private getDecodedToken(): any {
        const token = this.getSessionItem('accessToken');
        return token ? this.safeDecodeToken(token) : null;
    }

    private safeDecodeToken(token: string): any {
        try {
            return this.decodeToken(token);
        } catch {
            this.logout();
            return null;
        }
    }

    private decodeToken(token: string): any {
        return JSON.parse(atob(token.split('.')[1]));
    }
}
