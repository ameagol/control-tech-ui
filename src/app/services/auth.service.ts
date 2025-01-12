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
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        this.initializeAuthenticationState();
    }

    login(email: string, password: string): Observable<TokenModel> {
        const body = { email, password };

        return this.http.post<TokenModel>(this.apiUrl, body).pipe(
            map(response => {
                if (response?.accessToken) {
                    this.storeToken(response.accessToken);
                    this.isAuthenticatedSubject.next(true); // Set authentication state
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
        return this.safeExecute(() => {
            const token = this.getToken();
            if (!token) throw new Error('Token not found');
            const decodedToken = this.decodeToken(token);
            return decodedToken?.sub || 'Unknown User';
        }, 'Unknown User');
    }

    private getSessionItem(key: string): string | null {
        return typeof window !== 'undefined' ? sessionStorage.getItem(key) : null;
    }

    private checkToken(): boolean {
        return this.safeExecute(() => {
            const token = this.getToken();
            if (!token) return false;
            const decodedToken = this.decodeToken(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken?.exp > currentTime; // Return token validity
        }, false);
    }

    private decodeToken(token: string): any {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid token structure');
        return JSON.parse(atob(parts[1]));
    }

    /**
     * Centralized safe execution with error handling and logout on failure.
     * @param callback The function to execute safely.
     * @param defaultValue The default value to return in case of an error.
     * @returns The result of the callback or the default value on error.
     */
    private safeExecute<T>(callback: () => T, defaultValue: T = null as any): T {
        try {
            return callback();
        } catch (error) {
            this.logout();
            return defaultValue;
        }
    }

    /**
     * Initialize authentication state on service construction.
     */
    private initializeAuthenticationState(): void {
        const isAuthenticated = this.checkToken();
        this.isAuthenticatedSubject.next(isAuthenticated);
    }
}

