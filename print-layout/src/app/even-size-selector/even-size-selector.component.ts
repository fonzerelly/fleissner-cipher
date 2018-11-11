import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-even-size-selector',
  templateUrl: './even-size-selector.component.html',
  styleUrls: ['./even-size-selector.component.css']
})
export class EvenSizeSelectorComponent implements OnInit {

  evenSizes: Array<number>;
  model = { selectedSize: 6 };
  constructor() {
    this.evenSizes = [];
    for (let i = 2; i <= 20; i += 2) {
      this.evenSizes.push(i);
    }
  }

  ngOnInit() {}

}
