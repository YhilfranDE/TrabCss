import { TestBed, inject } from '@angular/core/testing';

import { LlamadasService } from './llamadas.service';

describe('LlamadasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LlamadasService]
    });
  });

  it('should be created', inject([LlamadasService], (service: LlamadasService) => {
    expect(service).toBeTruthy();
  }));
});
