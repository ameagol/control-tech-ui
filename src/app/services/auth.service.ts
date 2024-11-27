import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable, throwError} from 'rxjs';

import { catchError } from 'rxjs/operators';
import {LoginResponse} from "../model/login-response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8081/api/auth/login';
    private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkToken());


    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<LoginResponse> {
        const body = { username, password };

        return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
            map(response => {
                if (response && response.accessToken) {
                    sessionStorage.setItem('accessToken', response.accessToken);

                    this.isAuthenticatedSubject.next(true);
                }
                return response;
            }),
            catchError(error => {
                return throwError(() => new Error('Login failed: ' + error.message));
            })
        );
    }

    storeToken(token: string): void {
        sessionStorage.setItem('accessToken', token);
        this.isAuthenticatedSubject.next(true); // Notify subscribers that user is authenticated
    }

    getToken(): string | null {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            return sessionStorage.getItem('accessToken');
        }
        return null;
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    checkToken(): boolean {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const token = sessionStorage.getItem('accessToken');
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
                    return decodedToken.exp > currentTime; // Check if token is expired
                } catch (error) {
                    return false;
                }
            }
            return false;
        }
        return false;
    }

    logout(): void {
        sessionStorage.removeItem('accessToken');
        this.isAuthenticatedSubject.next(false); // Notify subscribers that user is logged out
    }
}
