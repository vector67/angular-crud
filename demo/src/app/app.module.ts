import { FlightModule } from './flight/flight.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { APP_EXTRA_OPTIONS, APP_ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ArArModule } from './arAr/ar-ar.module';
import { ApiModule, BASE_PATH } from "../api";
import { LoginService } from "./services/api/login.service";
import { AuthorizationService } from "./services/api/authorization.service";
import { AuthorizationInterceptor } from "./interceptors/authorization.interceptor";
import { environment } from "../environments/environment";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ApiEffects } from './store/api.effects';
import { StoreModule } from "@ngrx/store";
import * as fromApi from './store/api.reducers';
import { hydrationMetaReducer } from "./store/hydration.reducer";
import { EffectsModule } from "@ngrx/effects";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FlightModule,
    RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}),
    ArArModule,
    ApiModule,
    EffectsModule.forRoot([ApiEffects]),
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromApi.featureKey, fromApi.apiReducer, {metaReducers: [hydrationMetaReducer]}),

  ],
  declarations: [
    AppComponent,
    LoginFormComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
  ],
  providers: [
    LoginService,
    AuthorizationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    {provide: BASE_PATH, useValue: environment.apiUrl + '/Api/V8'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
