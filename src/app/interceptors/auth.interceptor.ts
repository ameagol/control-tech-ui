import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import {GlobalDialogComponent} from "../global-dialog/global-dialog.component";
import {UIRoutes} from "../constants/device-options.constants";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const loadingService = inject(LoadingService);
    const dialog = inject(MatDialog);
    const token = authService.getToken();

    const clonedReq = token
        ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        })
        : req;

    loadingService.show();

    return next(clonedReq).pipe(
        finalize(() => {
            loadingService.hide();
        }),
        catchError((error) => {
            let title;
            let message;

            switch (error.status) {
                case 0: // Network or CORS error
                    title = 'Network Error';
                    message = 'Unable to connect to the server. Please check your internet connection.';
                    break;

                case 400: // Bad Request
                    title = 'Bad Request';
                    message = error.error?.message || 'There was an issue with your request. Please check the data and try again.';
                    break;

                case 401: // Unauthorized
                    authService.logout();
                    title = 'Not Authorized';
                    message = error.error?.message || 'Invalid Credentials Provided, Verify User and Password';
                    router.navigate([UIRoutes.LOGIN]);
                    break;

                case 403: // Forbidden
                    title = 'Access Denied';
                    message = error.error?.message || 'You do not have permission to perform this action.';
                    break;

                case 404: // Not Found
                    title = 'Resource Not Found';
                    message = error.error?.message || 'The requested resource was not found.';
                    break;

                case 409: // Conflict
                    title = 'Conflict';
                    message = error.error?.message || 'The resource you are trying to create already exists.';
                    break;

                case 500: // Internal Server Error
                    title = 'Server Error';
                    message = 'An error occurred on the server. Please try again later.';
                    break;

                case 503: // Service Unavailable
                    title = 'Service Unavailable';
                    message = 'The service is temporarily unavailable. Please try again later.';
                    break;

                default: // Other errors
                    title = 'Service Unavailable';
                    message = 'The service is temporarily unavailable. Please try again later.';
            }

            dialog.open(GlobalDialogComponent, {
                data: { title, message },
            });

            return throwError(() => error);
        })
    );
};
