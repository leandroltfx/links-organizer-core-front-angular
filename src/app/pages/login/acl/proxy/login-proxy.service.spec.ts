import { TestBed } from '@angular/core/testing';

import { LoginProxyService } from './login-proxy.service';

describe('LoginProxyService', () => {
  let service: LoginProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginProxyService
      ]
    });
    service = TestBed.inject(LoginProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
