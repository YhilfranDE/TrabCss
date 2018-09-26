import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-benefits-affiliation',
  templateUrl: './benefits-affiliation.component.html',
  styleUrls: ['./benefits-affiliation.component.css']
})
export class BenefitsAffiliationComponent implements OnInit {


  loading: boolean;
  loadCompletedHere: boolean;

  constructor() {
    this.loading = true;
  }

  ngOnInit() {

    this.loading = false;
    this.loadCompletedHere = true;
  }


}
