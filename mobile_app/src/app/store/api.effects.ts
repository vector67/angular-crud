import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { filter, map, mergeMap, tap } from "rxjs/operators";
import { ModuleService, RelationshipService } from "../../api";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ApiState } from "./api.state";
import { MatSnackBar } from "@angular/material/snack-bar";
import { logout } from "./api.actions";
// import {
//   loadBeeCertificates,
//   loadedBeeCertificates
// } from "../components/bee-certificates/store/bee-certificates.actions";
// import { loadContacts, loadedContacts } from "../components/contacts/store/contacts.actions";

@Injectable()
export class ApiEffects {
  logoutRedirect$ = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap(_ => this.router.navigate(['login'])),
    ),
    {dispatch: false}
  );
  // loadBeeCertificates$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(loadBeeCertificates),
  //     concatLatestFrom(action => this.store.select(selectVendor).pipe(filter(vendor => !!vendor))),
  //     mergeMap(([action, vendor]) => {
  //       return this.relationshipService.moduleModuleNameIdRelationshipsRelationshipGet(
  //         'v_Vendors',
  //         vendor?.id as string,
  //         'v_vendors_v_vendor_bbbee_1',
  //         true
  //       );
  //     }),
  //     map((certificateResponse) => loadedBeeCertificates({beeCertificates: certificateResponse.data}))
  //   )
  // );
  // loadContacts$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(loadContacts),
  //     concatLatestFrom(action => this.store.select(selectVendor).pipe(filter(vendor => !!vendor))),
  //     mergeMap(([action, vendor]) => {
  //       return this.relationshipService.moduleModuleNameIdRelationshipsRelationshipGet(
  //         'v_Vendors',
  //         vendor?.id as string,
  //         'contacts_v_vendors_1',
  //         true
  //       );
  //     }),
  //     map((contactResponse) => loadedContacts({contacts: contactResponse.data}))
  //   )
  // );

  constructor(
    private actions$: Actions,
    private router: Router,
    private moduleService: ModuleService,
    private relationshipService: RelationshipService,
    private store: Store<ApiState>,
    private _snackBar: MatSnackBar
  ) {
  }
}
