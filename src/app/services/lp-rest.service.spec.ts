import { TestBed } from '@angular/core/testing';

import { LpRestService } from './lp-rest.service';
import {HttpClientModule} from "@angular/common/http";

describe('LpRestService', () => {
  let service: LpRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LpRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
