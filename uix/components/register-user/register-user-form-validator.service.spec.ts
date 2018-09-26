import { TestBed, inject } from '@angular/core/testing';

import { RegisterUserFormValidatorService } from './register-user-form-validator.service';

describe('RegisterUserFormValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterUserFormValidatorService]
    });
  });

  it('should be created', inject([RegisterUserFormValidatorService], (service: RegisterUserFormValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
