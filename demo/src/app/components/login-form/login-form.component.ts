import { Component, OnInit } from '@angular/core';
import { ApiState } from "../../store/api.state";
import { Store } from "@ngrx/store";
import { zip } from "rxjs";
import { loginFailure, loginSuccess, saveUserId, } from "../../store/api.actions";
import { selectLoggedIn } from "../../store/api.selectors";
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { mergeMap } from "rxjs/operators";
import { LoginService } from "../../services/api/login.service";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../services/api/authorization.service";
import { ModuleService, RelationshipService } from "../../../api";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseComponent } from "../base-component/base.component";

@Component({
  selector: 'crm-client-feedback-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [Store]
})
export class LoginFormComponent extends BaseComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean = false;
  public successfulLogin: boolean = false;

  private loginError: ValidationErrors | null = null;

  constructor(
    private store: Store<ApiState>,
    private loginService: LoginService,
    private router: Router,
    private relationshipService: RelationshipService,
    private moduleService: ModuleService,
    private authorizationService: AuthorizationService,
    private _snackBar: MatSnackBar
  ) {
    super();
    zip([this.store.select(selectLoggedIn).pipe(this.takeUntilDestroyed()), this.authorizationService.tokenExpired().pipe(this.takeUntilDestroyed())])
      .subscribe(([loggedIn, tokenExpired]) => {
          if (loggedIn && !tokenExpired) {
            this.router.navigate(['home']);
          }
        }
      );
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    }, {
      validators: (control: AbstractControl): ValidationErrors | null => {
        return this.loginError;
      }
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    let username = this.loginForm.get('username')?.value;
    let tncsConsent: boolean;
    this.loginService.loginPost(
      {
        username,
        password: this.loginForm.get('password')?.value,
        grant_type: "", // these two are automatically filled in by the login service
        client_id: "",
      }
    ).pipe(
      mergeMap((loginToken) => {
        tncsConsent = loginToken.user.tncsConsent == "1";
        this.store.dispatch(loginSuccess({...loginToken, username}));
        this._snackBar.open('Successful Login. Retrieving vendor details.', 'Close');
        this.store.dispatch(saveUserId({
          attributes: loginToken.user.attributes,
          id: loginToken.user.id,
          tncs: tncsConsent
        }));
        console.log('loginToken', loginToken);
        if (!tncsConsent) {
          console.log('tncsConsent', tncsConsent);
          this.router.navigate(['/tncs']);
        }
        return this.relationshipService.moduleModuleNameIdRelationshipsRelationshipGet(
          'User',
          loginToken.user.id,
          'v_vendors_users_1',
          true
        );
      })
    ).subscribe((vendorResponses: any) => {
        this._snackBar.open('Vendors loaded.', 'Close', {duration: 2000});
        if (vendorResponses && vendorResponses.data) {
          if (vendorResponses.data.length > 1) {
            // this.store.dispatch(vendorsFoundSuccess({vendors: vendorResponses.data}));
            if (tncsConsent) {
              this.router.navigate(['/vendor/selection']);
            }
          } else if (vendorResponses.data.length == 1) {
            // this.store.dispatch(vendorFoundSuccess({vendor: vendorResponses.data[0]}));
            if (tncsConsent) {
              this.router.navigate(['/home']);
            }
          } else {
            this.router.navigate(['/error']);
          }
        }
      },
      (error) => {
        console.log('error', error);
        console.log('error', error.error.message);
        let errorMessage = error.error.message;
        if (!errorMessage) {
          errorMessage = 'Technical error occurred.';
        }
        this.store.dispatch(loginFailure({message: errorMessage}));
        this.loginError = {incorrect: errorMessage};
        this.loginForm.updateValueAndValidity();
        this.successfulLogin = false;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
