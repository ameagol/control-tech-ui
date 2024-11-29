import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable, throwError} from 'rxjs';

import { catchError } from 'rxjs/operators';
import {LoginResponse} from "../model/login-response";
import {LOGIN} from "../constants/device-options.constants";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8081/' + LOGIN;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkToken());

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<LoginResponse> {
        const body = { username, password };

        return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
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

    private getSessionItem(key: string): string | null {
        return typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
    }

    private checkToken(): boolean {
        const token = this.getSessionItem('accessToken');
        if (token) {
            try {
                const decodedToken = this.decodeToken(token);
                const currentTime = Math.floor(Date.now() / 1000);
                return decodedToken?.exp > currentTime;
            } catch {
                return false;
            }
        }
        return false;
    }

    private decodeToken(token: string): any {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            return null;
        }
    }
}
