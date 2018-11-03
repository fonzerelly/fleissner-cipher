import { Component, OnInit, Input } from '@angular/core';
import { FleissnerCipherWrapperService } from '../fleissner-cipher-wrapper.service';
import { BooleanMatrix } from '../boolean-matrix';
import { faCut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boolean-matrix',
  templateUrl: './boolean-matrix.component.html',
  styleUrls: ['./boolean-matrix.component.css']
})
export class BooleanMatrixComponent implements OnInit {

  @Input() size: number;
  matrix: BooleanMatrix;
  faCut = faCut;
  service: FleissnerCipherWrapperService;
  constructor(private fleissnerCipher: FleissnerCipherWrapperService) {
    this.service = fleissnerCipher;
  }

  ngOnInit() {
    console.log('###', this.size);
    this.matrix = this.service.createMatrix(this.size);
  }

}
