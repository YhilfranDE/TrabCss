import { Component, OnInit } from '@angular/core';
import { ClientsService } from "../../services/clients/clients.service";
import { DocumentsService } from "../../services/documents/documents.service";


@Component({
    selector: 'app-contacts-attention',
    templateUrl: './contacts-attention.component.html',
    styleUrls: ['./contacts-attention.component.css']
})
export class ContactsAttentionComponent implements OnInit {

    data: any;
    loading: boolean;
    isError: boolean;
    errorMessage: string;
    contact: any[] = [];
    loadCompleted:boolean; 


    constructor(
        private documentsService: DocumentsService, private clientsService: ClientsService) { }

    ngOnInit() {

        this.loadData();
        }


    loadData() {
        this.loading = true;
        var userId = localStorage.getItem("userId");
        this.clientsService.misDatos(userId).subscribe(result => {
            this.data = this.assignData(result.json());
          /* var customerId =
            {
                customerId: this.data.customerDocumentNumber
            }*/
            this.getDealersByCustomer(this.data);
           // this.loading = false;
            
        }, err => {
            this.loading = false;
            var error = <any>err;
            var jsonObject = JSON.parse(error.text());
            var error = jsonObject.message;
            this.errorMessage = error;
        });
    }

    assignData(value) {
        return { customerDocumentNumber: value.customerDocumentNumber }
    }

    getDealersByCustomer(data) {       
        this.documentsService.getDealersByCustomer(data.customerDocumentNumber)
            .subscribe(result => {
                this.contact = result.json();
                this.loading = false;
                this.loadCompleted = true;
            }, err => {
                this.loading = false;
                this.loadCompleted = true;
                var error = <any>err;
                var jsonObject = JSON.parse(error.text());
                var error = jsonObject.message;
                this.errorMessage = error;
            });
    }



}



