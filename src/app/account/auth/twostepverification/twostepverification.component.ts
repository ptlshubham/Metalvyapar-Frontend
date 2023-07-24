import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twostepverification',
  templateUrl: './twostepverification.component.html',
  styleUrls: ['./twostepverification.component.scss']
})

/**
 * Two Step Verification Component
 */
export class TwostepverificationComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;

  /**
   * Confirm Otp Verification
   */
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: ' * ',
    inputStyles: {
      'width': '45px',
      'height': '45px'
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
