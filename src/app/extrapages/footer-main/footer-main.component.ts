import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrls: ['./footer-main.component.scss']
})
export class FooterMainComponent implements OnInit {
  year: number = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
