import { TestBed } from '@angular/core/testing';

import { GlobalFooServiceService } from './global-foo-service.service';

describe('GlobalFooServiceService', () => {
  let service: GlobalFooServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalFooServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
