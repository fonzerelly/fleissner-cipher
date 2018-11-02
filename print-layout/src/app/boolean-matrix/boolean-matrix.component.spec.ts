import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanMatrixComponent } from './boolean-matrix.component';

describe('BooleanMatrixComponent', () => {
  let component: BooleanMatrixComponent;
  let fixture: ComponentFixture<BooleanMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
