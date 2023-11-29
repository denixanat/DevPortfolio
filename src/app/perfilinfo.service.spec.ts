import { TestBed } from '@angular/core/testing';

import { PerfilinfoService } from './perfilinfo.service';

describe('PerfilinfoService', () => {
  let service: PerfilinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
