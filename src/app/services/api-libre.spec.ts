import { TestBed } from '@angular/core/testing';

import { ApiLibre } from './api-libre';

describe('ApiLibre', () => {
  let service: ApiLibre;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLibre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
