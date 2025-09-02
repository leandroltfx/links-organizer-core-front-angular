import { TestBed } from '@angular/core/testing';

import { LoginAdapterService } from './login-adapter.service';

describe('LoginAdapterService', () => {
  let service: LoginAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginAdapterService
      ]
    });
    service = TestBed.inject(LoginAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
