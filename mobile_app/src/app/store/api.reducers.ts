import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, resetStore, saveUserId, } from "./api.actions";
import { ApiState } from "./api.state";
import { SuiteCRMLoginResponse } from "../../api/model/suitecrm-login-response.model";

// import {
//   updateVendorFunction,
//   vendorFoundSuccessFunction,
//   vendorsFoundSuccessFunction
// } from "../components/vendor/store/vendor.reducers";
// import {
//   loadedBeeCertificatesFunction,
//   uploadedBeeCertificatesFunction
// } from "../components/bee-certificates/store/bee-certificates.reducers";
// import {
//   contactCreatedFunction, contactDeletedFunction,
//   contactUpdatedFunction,
//   loadedContactsFunction
// } from "../components/contacts/store/contacts.reducers";
// import { updateVendor, vendorFoundSuccess, vendorsFoundSuccess } from "../components/vendor/store/vendor.actions";
// import {
//   loadedBeeCertificates,
//   uploadedBeeCertificates
// } from "../components/bee-certificates/store/bee-certificates.actions";
// import {
//   contactCreated,
//   contactDeleted,
//   contactUpdated,
//   loadedContacts
// } from "../components/contacts/store/contacts.actions";

interface Action {
  type: string;
  payload?: any;
}

export const featureKey = "api";

export const initialState: ApiState = {
  loggedIn: false,
  accessToken: '',
  refreshToken: '',
  expires: -1
};
const loginSuccessFunction = (state: ApiState, action: SuiteCRMLoginResponse): ApiState => {
  let expiration_time = action.expires_in * 1000 + (new Date()).getTime();
  return {
    loggedIn: !!action.access_token,
    accessToken: action.access_token,
    refreshToken: action.refresh_token,
    expires: expiration_time
  };
}
const logoutFunction = (_: ApiState): ApiState => {
  return {loggedIn: false, accessToken: '', refreshToken: '', expires: -1};
}
const saveUserIdFunction = (state: ApiState, action: { attributes: any, id: string, tncs: boolean }): ApiState => {
  return {...state, user: { attributes: action.attributes, tncsConsent: action.tncs, id: action.id }};
}

const resetStoreFunction = (_: ApiState): ApiState => {
  return Object.assign({}, initialState);
}


const _apiReducer = createReducer(
  initialState,
  on(loginSuccess, loginSuccessFunction),
  on(logout, logoutFunction),
  on(saveUserId, saveUserIdFunction),
  // on(updateVendor, updateVendorFunction),
  // on(vendorFoundSuccess, vendorFoundSuccessFunction),
  // on(vendorsFoundSuccess, vendorsFoundSuccessFunction),
  //
  // on(loadedBeeCertificates, loadedBeeCertificatesFunction),
  // on(uploadedBeeCertificates, uploadedBeeCertificatesFunction),
  //
  // on(loadedContacts, loadedContactsFunction),
  // on(contactCreated, contactCreatedFunction),
  // on(contactDeleted, contactDeletedFunction),
  // on(contactUpdated, contactUpdatedFunction),

  on(resetStore, resetStoreFunction),
);

export function apiReducer(state: ApiState | undefined, action: Action) {
  return _apiReducer(state, action);
}
