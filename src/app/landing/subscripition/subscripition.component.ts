import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscripition',
  templateUrl: './subscripition.component.html',
  styleUrls: ['./subscripition.component.scss']
})
export class SubscripitionComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  // monthlyData!: monthlyPlan[];
  // yearlyData!: yearlyPlan[];
  monthlyData: any = [
    {
      title: 'Starter',
      price: '29'
    },
    {
      title: 'Professional',
      price: '49'
    },
    {
      title: 'Enterprise',
      price: '79',
      badge: 'Featured'
    },
    {
      title: 'Unlimited',
      price: '99'
    }
  ];
  constructor() { }

  ngOnInit(): void {
    this._fetchData();

  }
  // Pricing Data Fetch
  private _fetchData() {
    this.monthlyData
  }
}
