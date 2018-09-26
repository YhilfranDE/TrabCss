import { Component, OnInit, ViewChild,Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientsService } from '../../../services/clients/clients.service';
import { DocumentsService } from '../../../services/documents/documents.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() loadCompleted: EventEmitter<boolean>;

  // object with form attributes
  dataFilter = {
    customerId: null,
    businessId: "",
    invoiceTypeId: "",
    invoiceId: null
  }

  data: any;
  loading: boolean;
  errorMessage: string;
  errorBussines: string;
  errorDoc: string;
  errorFilter: string;
  errorExport: string;
  msg: string;
  business = "";
  docTypes: any[];
  list: any[];
  p: number = 1;
  pagination: boolean = false;
  dowloadValid;
  viewTable = false;
  loadCompletedHere: boolean;

  constructor(private clientsService: ClientsService,
    private documentsService: DocumentsService,
  ) {
    this.loadCompleted = new EventEmitter()
    this.loadCompletedHere = false;

    this.data = {
      customerDocumentNumber: null,
    }
    this.loading = false;
  }

  ngOnInit() {
    this.loadData();
  }
  // initial data load
  loadData() {
   
    var userId = localStorage.getItem("userId");
    this.clientsService.misDatos(userId).subscribe(result => {
      this.data = this.assignData(result.json());
      this.getBusiness(this.data);//--> Load Business Data 
      this.getTypeDoc(this.data);//--> Load TypeDoc 
      this.dataFilter.customerId = this.data.customerDocumentNumber; //-> Ruc assign DataFilter              
      this.loadCompleted.emit(true);
      this.loadCompletedHere = true;
    }, err => {
      this.loading = false;
      this.loadCompleted.emit(true);
      this.loadCompletedHere = true;
      var error = <any>err;
      var jsonObject = JSON.parse(error.text());
      this.errorMessage = jsonObject.message;
      this.msg = this.errorMessage;
    });
  } 

  assignData(value) {
    return {
      customerDocumentNumber: value.customerDocumentNumber,
    }
  }

  // Get business data
  getBusiness(datos) {
   // this.loading = true;
    this.clientsService.getBusinessByCustomer(datos.customerDocumentNumber)
      .subscribe(result => {
        this.business = result.json();
      }, err => {
       // this.loading = false;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage = jsonObject.message;
        this.errorBussines = this.errorMessage;
      });
  }

  // Get data types of documents
  getTypeDoc(datos) {
   // this.loading = true;
    this.documentsService.getInvoiceTypeByCustomer(datos.customerDocumentNumber)
      .subscribe(result => {
        this.docTypes = result.json();
      }, err => {
        this.loading = false;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage = jsonObject.message;
        this.errorDoc = this.errorMessage;
      });
  }

  // Search filter
  searchFilter() {
    this.loading = true;
    this.documentsService.getInvoiceByBusiness(
      this.dataFilter.customerId, this.dataFilter.businessId, this.dataFilter.invoiceTypeId)
      .subscribe(result => {
        this.list = result.json();
        this.errorExport = null;
        this.errorFilter = null;
        this.pagination = true;
        this.viewTable =true;
        this.loading = false;      
      }, err => {
        this.viewTable =false;
        this.pagination = false;
        this.list = null;
        this.loading = false;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage = jsonObject.message;
        this.errorExport = null;
        this.errorFilter = this.errorMessage;
      });

  }

  //Dowload pdf files for Invoice
  exportFile(invoiceId,invoiceSpeed) {
    this.loading = true;
    this.documentsService.downloadFile(invoiceId,invoiceSpeed)
      .subscribe(res => {
        console.log('start download:', res);
        console.log("PDF", res);
        console.log(res);
        this.errorExport = null;
        var url = window.URL.createObjectURL(res.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = res.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
        this.loading = false;
        this.dowloadValid="Descarga exitosa..."
        $(".dowloadTrue").fadeOut(1000);
      }, err => {
        console.log('download error:', JSON.stringify(err));
        this.loading = false;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage = jsonObject.message;
        this.dowloadValid ="";
        this.errorExport = "Error al descargar archivo.";
      }, () => {
        console.log('Completed file download.')
        this.loading = false;
      });

  }

  //Dowload pdf files for List Invoice
  exportList(invoiceTypeId) {
    this.loading = true;
    this.documentsService.processExportInvoiceByBusiness(
      this.dataFilter.customerId, this.dataFilter.businessId, this.dataFilter.invoiceTypeId, invoiceTypeId)
      .subscribe(res => {
        console.log('start download:', res);
        console.log("PDF", res);
        var url = window.URL.createObjectURL(res.data);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = res.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element   
        console.log(res);
        this.errorExport = null;
        this.loading = false;
        this.dowloadValid="Descarga exitosa..."
        $(".dowloadTrue").fadeOut(1000);
      }, err => {
        this.loading = false;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage = jsonObject.message;
        this.dowloadValid ="";
        this.errorExport = this.errorMessage;
      });

  }

  onClick() {
    this.dataFilter.businessId = '';
    this.dataFilter.invoiceTypeId = '';
    this.viewTable = false;
    this.errorFilter="";
  }
  
}
