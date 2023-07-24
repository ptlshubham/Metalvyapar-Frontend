import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.scss']
})
export class BuyerListComponent implements OnInit {
  byuerTrade: any = [ ]
  constructor() { }

  ngOnInit(): void {
  }

}
