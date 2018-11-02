import { Injectable } from '@angular/core';
import fleissnerCipher from '../../../lib/fleissner-cipher/fleissner-cipher';
import { BooleanMatrix } from './boolean-matrix';

export class CreateMatrixParams {
  size: number;
  salt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FleissnerCipherWrapperService {

  constructor() { }

  createMatrix(size: number, salt?: string): BooleanMatrix {
    return fleissnerCipher.createMatrix({size, salt});
  }
}
