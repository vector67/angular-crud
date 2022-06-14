import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApiState } from "../../store/api.state";
import { selectApiState } from "../../store/api.selectors";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthorizationService {
  constructor(private store: Store<ApiState>) {
  }

  tokenExpired(): Observable<boolean> {

    return this.store.select(selectApiState)
      .pipe(
        map(apiState => apiState.expires != -1 && apiState.expires < (new Date()).getTime())
      );
  }
}
