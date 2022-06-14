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
import { ArArModule } from './modules/arAr/ar-ar.module';
import { ApiModule, BASE_PATH } from "../api";
import { LoginService } from "./services/api/login.service";
import { AuthorizationService } from "./services/api/authorization.service";
import { AuthorizationInterceptor } from "./interceptors/authorization.interceptor";
import { environment } from "../environments/environment";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ApiEffects } from './store/api.effects';
import { StoreModule } from "@ngrx/store";
import * as fromApi from './store/api.reducers';
import { hydrationMetaReducer } from "./store/hydration.reducer";
import { EffectsModule } from "@ngrx/effects";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AccountsModule } from './modules/accounts/accounts.module';
import { VVendorBbbeeModule } from './modules/VVendorBbbee/vvendor-bbbee.module';
import { BstBstProjectLookupModule } from './modules/bstBstProjectLookup/bst-bst-project-lookup.module';
import { CoDivisionModule } from './modules/coDivision/co-division.module';
import { BuBuModule } from './modules/buBu/bu-bu.module';
import { CsqCsqModule } from './modules/csqCsq/csq-csq.module';
import { Cv1CvResourcingModule } from './modules/cv1CvResourcing/cv1-cv-resourcing.module';
import { Cv1CvRoleModule } from './modules/cv1CvRole/cv1-cv-role.module';
import { CfClientFeedbackModule } from './modules/cfClientFeedback/cf-client-feedback.module';
import { CtClientSectorModule } from './modules/ctClientSector/ct-client-sector.module';
import { CtClientTypeModule } from './modules/ctClientType/ct-client-type.module';
import { CoCompanyModule } from './modules/coCompany/co-company.module';
import { CCompetitorsOppModule } from './modules/CCompetitorsOpp/ccompetitors-opp.module';
import { CContractTypeModule } from './modules/CContractType/ccontract-type.module';
import { EpEmployeePublicModule } from './modules/epEmployeePublic/ep-employee-public.module';
import { FFunctionModule } from './modules/FFunction/ffunction.module';
import { O1GlCodesModule } from './modules/O1GlCodes/o1-gl-codes.module';
import { IpIdProjectsModule } from './modules/ipIdProjects/ip-id-projects.module';
import { R1InnovationsModule } from './modules/R1Innovations/r1-innovations.module';
import { LeadsClientsModule } from './modules/leadsClients/leads-clients.module';
import { LeadsClientMappingModule } from './modules/leadsClientMapping/leads-client-mapping.module';
import { L1LegalCommentsModule } from './modules/L1LegalComments/l1-legal-comments.module';
import { CoLegalentityModule } from './modules/coLegalentity/co-legalentity.module';
import { RegLocationModule } from './modules/regLocation/reg-location.module';
import { OsOppClassModule } from './modules/osOppClass/os-opp-class.module';
import { OsOppStatusModule } from './modules/osOppStatus/os-opp-status.module';
import { R1rOppRiskModule } from './modules/R1rOppRisk/r1r-opp-risk.module';
import { PoPoTravelModule } from './modules/poPoTravel/po-po-travel.module';
import { PoPoTravelTransModule } from './modules/poPoTravelTrans/po-po-travel-trans.module';
import { PiPiModule } from './modules/piPi/pi-pi.module';
import { PdsPdsModule } from './modules/pdsPds/pds-pds.module';
import { PpProjectPhotoModule } from './modules/ppProjectPhoto/pp-project-photo.module';
import { ClRatingModule } from './modules/clRating/cl-rating.module';
import { RegReggrpModule } from './modules/regReggrp/reg-reggrp.module';
import { RegRegionnameModule } from './modules/regRegionname/reg-regionname.module';
import { PrProjectriskModule } from './modules/prProjectrisk/pr-projectrisk.module';
import { RtRiskTypeModule } from './modules/rtRiskType/rt-risk-type.module';
import { F1SnbForecastModule } from './modules/F1SnbForecast/f1-snb-forecast.module';
import { FSubfunctionModule } from './modules/FSubfunction/fsubfunction.module';
import { RegSubLocationModule } from './modules/regSubLocation/reg-sub-location.module';
import { FSubsubfunctionModule } from './modules/FSubsubfunction/fsubsubfunction.module';
import { VoVoModule } from './modules/voVo/vo-vo.module';
import { VVendorEvaluationModule } from './modules/VVendorEvaluation/vvendor-evaluation.module';
import { VVendorsModule } from './modules/VVendors/vvendors.module';
import { VisitVisitModule } from './modules/visitVisit/visit-visit.module';
import { WipWipModule } from './modules/wipWip/wip-wip.module';
import { WipcWipComModule } from './modules/wipcWipCom/wipc-wip-com.module';
import { ArcArCommentsModule } from './modules/arcArComments/arc-ar-comments.module';
import { ModuleSearchComponent } from './components/module-search/module-search.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
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
        AccountsModule,
        VVendorBbbeeModule,
        BstBstProjectLookupModule,
        CoDivisionModule,
        BuBuModule,
        CsqCsqModule,
        Cv1CvResourcingModule,
        Cv1CvRoleModule,
        CfClientFeedbackModule,
        CtClientSectorModule,
        CtClientTypeModule,
        CoCompanyModule,
        CCompetitorsOppModule,
        CContractTypeModule,
        EpEmployeePublicModule,
        FFunctionModule,
        O1GlCodesModule,
        IpIdProjectsModule,
        R1InnovationsModule,
        LeadsClientsModule,
        LeadsClientMappingModule,
        L1LegalCommentsModule,
        CoLegalentityModule,
        RegLocationModule,
        OsOppClassModule,
        OsOppStatusModule,
        R1rOppRiskModule,
        PoPoTravelModule,
        PoPoTravelTransModule,
        PiPiModule,
        PdsPdsModule,
        PpProjectPhotoModule,
        ClRatingModule,
        RegReggrpModule,
        RegRegionnameModule,
        PrProjectriskModule,
        RtRiskTypeModule,
        F1SnbForecastModule,
        FSubfunctionModule,
        RegSubLocationModule,
        FSubsubfunctionModule,
        VoVoModule,
        VVendorEvaluationModule,
        VVendorsModule,
        VisitVisitModule,
        WipWipModule,
        WipcWipComModule,
        ArcArCommentsModule,
        FormsModule,
        MatTableModule,

    ],
  declarations: [
    AppComponent,
    LoginFormComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    ModuleSearchComponent,
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
