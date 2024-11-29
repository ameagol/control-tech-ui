import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import {AuthService} from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    const clonedReq = token ? req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    }) : req;

    return next(clonedReq).pipe(
        catchError((error) => {
            if ([0, 401].includes(error.status)) {
                authService.logout();
                router.navigate(['/login'], {
                    queryParams: {
                        errorMessage: 'Unauthorized. Please log in again.'
                    }
                });
            }
            return throwError(() => error);
        })
    );
};
