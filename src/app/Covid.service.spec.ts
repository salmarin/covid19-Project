import { TestBed } from '@angular/core/testing';

import { CovidService } from './Covid.service';

describe('ExpensesService', () => {
  let service: CovidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
