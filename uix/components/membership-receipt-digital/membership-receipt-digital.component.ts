import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-receipt-digital',
  templateUrl: './membership-receipt-digital.component.html',
  styleUrls: ['./membership-receipt-digital.component.css']
})
export class  MembershipReceiptDigitalComponent implements OnInit {


  loading:boolean;
  loadCompleted:boolean; 

  constructor() {

this.loading=true;

   }

  ngOnInit() { }


  
  setLoadCompleted(event){  
    console.log(event);
    if (event==true){
      this.loading = false;   
      this.loadCompleted=true;  
    } 

  }

}
