import { TestBed, inject } from '@angular/core/testing';

import { RecoverPasswordService } from './recover-password.service';

describe('RecoverPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecoverPasswordService]
    });
  });

  it('should be created', inject([RecoverPasswordService], (service: RecoverPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
