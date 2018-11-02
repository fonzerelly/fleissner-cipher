import { Component, OnInit } from '@angular/core';
import { FleissnerCipherWrapperService } from '../fleissner-cipher-wrapper.service';
import { BooleanMatrix } from '../boolean-matrix';
import { faCut } from '@fortawesome/free-solid-svg-icons';

// import Scissors_icon_black from '../../assets/Scissors_icon_black.svg';
@Component({
  selector: 'app-boolean-matrix',
  templateUrl: './boolean-matrix.component.html',
  styleUrls: ['./boolean-matrix.component.css']
})
export class BooleanMatrixComponent implements OnInit {

  scissors: any;
  matrix: BooleanMatrix;
  faCut = faCut;
  constructor(private fleissnerCipher: FleissnerCipherWrapperService) {
    this.matrix = fleissnerCipher.createMatrix(6);
    // this.scissors = Scissors_icon_black;
    console.log('####', this.scissors);
   }

  ngOnInit() {
  }

}
