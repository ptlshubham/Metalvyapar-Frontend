import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { Injectable, Inject } from '@angular/core';
// import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import ls from 'localstorage-slim';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
// import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        // @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
        private router: Router,
        // private toastr: ToastrManager
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         let token: any =ls.get('token', { decrypt: true });
        let adminToken: any = ls.get('authenticationAdminToken', { decrypt: true }) 
        if (ls.get('Role', { decrypt: true }) == 'MainAdmin') {
            if (request.url != ApiService.adminLoginURL) {
                if (adminToken == null || adminToken == undefined) {
                    console.log("token is null");
                    this.router.navigate(['/account/admin-login']);
                }
                 request = request.clone({ headers: request.headers.set('x-access-token', adminToken) });
                 return next.handle(request).pipe(catchError(err => {
                    if (err.status == 401 || err.status ==111) {
                        // auto logout if 401 response returned from api
                       this.router.navigate(['/account/admin-login']);
                    }
                    const error = err.error.statusText || err.statusText;
                    return throwError(error);
                }))
            }
        }
        else {
            if (token == null || token == undefined) {
                return next.handle(request);
            }
            else {
                if (request.url != ApiService.userLoginURL) {
                     request = request.clone({ headers: request.headers.set('x-access-token', token) });
                     return next.handle(request).pipe(catchError(err => {
                        if (err.status == 401 || err.status ==111) {
                            // auto logout if 401 response returned from api
                           this.router.navigate(['/account/login']);
                        }
                        const error = err.error.statusText || err.statusText;
                        return throwError(error);
                    }))
                }
                else {
                    return next.handle(request);
                }
            }
        }
        return next.handle(request);
    }
}