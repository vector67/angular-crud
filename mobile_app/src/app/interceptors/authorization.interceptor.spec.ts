import { TestBed } from '@angular/core/testing';

import { AuthorizationInterceptor } from './authorization.interceptor';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationInterceptor);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
