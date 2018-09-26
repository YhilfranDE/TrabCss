import * as core from '@angular/core';
import { ClientsService } from '../../services/clients/clients.service';

@core.Component({
  selector: 'app-billing-evolution',
  templateUrl: './billing-evolution.component.html',
  styleUrls: ['./billing-evolution.component.css']
})
export class BillingEvolutionComponent implements core.OnInit {
  loadCompleted:boolean; 
  loading: boolean;
  data: any;
  errorMessage: string;
  msg: string;

  constructor(private clientsService: ClientsService) { 
    this.loadCompleted = false;

    this.data = {
      customerDocumentNumber: null,
      customerName: null,
    }

    this.loadData();
  }

  ngOnInit() { }

  loadData() {   
    this.loading = true;
    var userId = localStorage.getItem("userId");
    this.clientsService.misDatos(userId).subscribe(result => {
      this.data = this.assignData(result.json());          
    }, err => {
     // this.loading = false;     
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
