import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Store } from "@ngrx/store";
import { ApiState } from "../store/api.state";
import { selectApiState, selectLoggedIn } from "../store/api.selectors";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, mergeMap, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptor implements HttpInterceptor {
  private loggedIn: boolean = false;

  constructor(private store: Store<ApiState>, private router: Router) {
    this.store.select(selectLoggedIn).subscribe(
      (loggedIn) => this.loggedIn = loggedIn
    )
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.url.includes('access_token')) {
      return this.handleErrors(next.handle(req));
    }
    return this.store.select(selectApiState).pipe(
      take(1),
      mergeMap((apiState) => {
        if (!apiState.loggedIn) {
          this.router.navigate(['login']);
          return throwError('not Logged in');
        }
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + apiState.accessToken)
        });
        return this.handleErrors(next.handle(authReq));
      }));
  }

  private handleErrors(observable: Observable<HttpEvent<any>>): Observable<any> {
    return observable.pipe(catchError((error) => {
      console.log('error', error);
      if (error.error.error === 'access_denied') {
        this.router.navigate(['login']);
      }
      return throwError(error);
    }));
  }
}
