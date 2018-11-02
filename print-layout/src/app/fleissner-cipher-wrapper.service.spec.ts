import { TestBed } from '@angular/core/testing';

import { FleissnerCipherWrapperService } from './fleissner-cipher-wrapper.service';

describe('FleissnerCipherWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FleissnerCipherWrapperService = TestBed.get(FleissnerCipherWrapperService);
    expect(service).toBeTruthy();
  });

  it('shoud return a boolean ArrayMatrix', () => {
    const service: FleissnerCipherWrapperService = TestBed.get(FleissnerCipherWrapperService);
    const result = service.createMatrix(6, 'eli');
    expect(result.length).toBe(6);
    result.forEach((row) => {
      expect(row.length).toBe(6);
      row.forEach((col) => {
        expect(typeof col).toBe('boolean');
      });
    });
  });
});
