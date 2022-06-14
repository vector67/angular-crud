import { createAction, props } from '@ngrx/store';
import { SuiteCRMLoginResponse } from "../../api/model/suitecrm-login-response.model";

export const logout = createAction('[API] Logout');
export const login = createAction('[API] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[API] Login Succeeded', props<SuiteCRMLoginResponse>());
export const loginFailure = createAction('[API] Login Failed', props<{ message: string }>());

export const saveUserId = createAction('[API] Save User ID', props<{ attributes: any, id: string, tncs: boolean }>());

export const resetStore = createAction('[API] Reset Store');
