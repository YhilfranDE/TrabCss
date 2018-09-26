import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients/clients.service';

@Component({
  selector: 'app-affiliated-businesses',
  templateUrl: './affiliated-businesses.component.html',
  styleUrls: ['./affiliated-businesses.component.css']
})
export class AffiliatedbusinessesComponent implements OnInit {

  data: any;
  loading: boolean;
  business: any[] =[];
  errorMessage:boolean;
  errorBussines:boolean;

  constructor(private clientsService: ClientsService) {

    this.loadData();
   }
  list: any[];

  ngOnInit() {

  }

 // initial data load
 loadData() {
  this.loading = true;
  var userId = localStorage.getItem("userId");
  this.clientsService.misDatos(userId).subscribe(result => {
      this.data = this.assignData(result.json());     
      this.getBusinessByCustomer(this.data);//--> Load Business Data      
       }, err => {
      this.loading = false;   
      var error = <any>err;
      var jsonObject = JSON.parse(error.text());    
      var error = jsonObject.message;
     this.errorMessage = error;   
  });
}

assignData(value) {
  return {customerDocumentNumber: value.customerDocumentNumber}
}

// Get business data
getBusinessByCustomer(data) {
  this.loading = true;
  this.clientsService.getBusinessByCustomer(data.customerDocumentNumber)
      .subscribe(result => {
          this.business = result.json();
          this.loading = false;
      }, err => {
          this.loading = false;
          var error = <any>err;
          var jsonObject = JSON.parse(error.text());
          var errorMessage = jsonObject.message;
          this.errorBussines = errorMessage;
      }); 

    }


}
