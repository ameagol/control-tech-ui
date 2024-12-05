import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, finalize} from 'rxjs';
import { throwError } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {LoadingService} from "../services/loading.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const loadingService = inject(LoadingService);
    const token = authService.getToken();

    const clonedReq = token
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        })
        : req;

    loadingService.show(); // Show progress bar

    return next(clonedReq).pipe(
        finalize(() => {
            loadingService.hide(); // Hide progress bar after response
        }),
        catchError((error) => {
            if ([0, 401].includes(error.status)) {
                authService.logout();
                router.navigate(['/login'], {
                    queryParams: {
                        errorMessage: 'Unauthorized. Please log in again.',
                    },
                });
            }
            return throwError(() => error);
        })
    );
};
