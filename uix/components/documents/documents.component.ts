import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients/clients.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  datos: any;
  loading: boolean; 
  errorMessage: string;
  msg: string;
  loadCompleted:boolean; 


  constructor(private clientsService: ClientsService) {
    this.datos = {
      customerDocumentNumber: null,
      customerName: null,
    }
   // this.loading = false;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    var userId = localStorage.getItem("userId");
    this.clientsService.misDatos(userId).subscribe(result => {
      this.datos = this.assignData(result.json());
     // this.loading = false;
    }, err => {
      this.loading = false;     
      var error = <any>err;
      var jsonObject = JSON.parse(error.text());
      this.errorMessage = jsonObject.message;
      this.msg = this.errorMessage;
    });
  }

  assignData(value) {
    return {
      customerDocumentNumber: value.customerDocumentNumber,
      customerName: value.customerName
    }
  }

  setLoadCompleted(event){  
    console.log(event);
    if (event==true){
      this.loading = false;   
      this.loadCompleted=true;  
    } 

  }
      


}
