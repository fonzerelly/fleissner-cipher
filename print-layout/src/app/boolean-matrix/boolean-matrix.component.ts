import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FleissnerCipherWrapperService } from '../fleissner-cipher-wrapper.service';
import { BooleanMatrix } from '../boolean-matrix';
import { faCut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boolean-matrix',
  templateUrl: './boolean-matrix.component.html',
  styleUrls: ['./boolean-matrix.component.css']
})
export class BooleanMatrixComponent implements OnChanges {

  @Input() size: number;
  @Input() salt: string;
  currentSize: number;
  currentSalt: string;
  matrix: BooleanMatrix;
  faCut = faCut;
  service: FleissnerCipherWrapperService;
  constructor(private fleissnerCipher: FleissnerCipherWrapperService) {
    this.service = fleissnerCipher;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.size) {
      this.currentSize = parseInt(changes.size.currentValue, 10);
    }
    if (changes.salt) {
        this.currentSalt = changes.salt.currentValue;
    }
    this.matrix = this.service.createMatrix(this.currentSize, this.currentSalt);
  }

}
