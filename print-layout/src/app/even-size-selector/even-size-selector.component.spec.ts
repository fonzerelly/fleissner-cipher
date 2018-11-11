import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { EvenSizeSelectorComponent } from './even-size-selector.component';

fdescribe('EvenSizeSelectorComponent', () => {
  let component: EvenSizeSelectorComponent;
  let fixture: ComponentFixture<EvenSizeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenSizeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenSizeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.evenSizes', () => {
    it('should contain a list with only even values', () => {
      let hasBeenTested = false;
      component.evenSizes.forEach((size) => {
        expect(size % 2).toBe(0);
        hasBeenTested = true;
      });
      expect(hasBeenTested).toBe(true);
    });

    it('should contain only the values up to 20', () => {
      expect(component.evenSizes.length).toBe(10);
    });
  });
  // describe('.selectedSize', () => {
  //   it('should be triggered on select call', () => {
  //     // component.select( )    
  //     return new Promise((resolve, reject) => {

  //     });
  //   });
  // });
});
