import { Component, OnInit, ViewChild } from "@angular/core";
import { ClientsService } from "../../services/clients/clients.service";
import { DocumentsService } from "../../services/documents/documents.service";

@Component({
  selector: "app-pending-documents",
  templateUrl: "./pending-documents.component.html",
  styleUrls: ["./pending-documents.component.css"]
})
export class PendingDocumentsComponent implements OnInit {
  services: any[];
  views: string;
  invoiceByProduct: any;
  optionSelect: string;
  data: any;
  isLoginError: boolean = false;
  errorMessage: string;
  msg: string;
  loading: boolean;
  loadCompletedHere: boolean;

  @ViewChild("list")
  invoice: any;

  constructor(
    private clientsService: ClientsService,
    private documentsService: DocumentsService
  ) {
    this.services = [{ description: "Seleccione un Producto" }];
    this.data = {
      customerDocumentNumber: "",
      customerName: ""
    };

    this.optionSelect = "";
  }

  ngOnInit() {
    this.headboard();
  }

  onServiceSelect(value) {   
    const index = this.services.findIndex(
      service => service.description === value
    );
    if (index != -1) {
      console.log(this.services[index]);
      this.invoiceByProduct = {
        customerId: this.data.customerDocumentNumber,
        productId: this.services[index].productId,
        status: "PENDIENTE"
      };

      this.invoice.invocice(this.invoiceByProduct);

      
    }
  }

  // Headboard of Page
  headboard() {
    var userId = localStorage.getItem("userId");
    this.loading = true;
    this.clientsService.misDatos(userId).subscribe(
      result => {
        console.log(result.json());
        this.loading = false;
        this.data = this.asignData(result.json());
        console.log(this.data);
        var customerId = {
          customerId: this.data.customerDocumentNumber
        };
        this.listProducts(customerId);
        this.loadCompletedHere = true;
      },
      err => {
        this.loading = false;
        this.isLoginError = true;
        this.loadCompletedHere = true;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage = jsonObject.message;
        this.msg = this.errorMessage;
      }
    );
  }
  asignData(value) {
    return {
      customerDocumentNumber: value.customerDocumentNumber,
      customerName: value.customerName
    };
  }

  // List of products
  listProducts(data) {
    //this.loading = true;
    this.documentsService.getProductsByCustomer(data).subscribe(
      result => {
        //this.loading = false;
        result.json().forEach(element => {
          this.services.push(element);
        });
        console.log(this.services);
      },
      err => {
        //this.loading = false;
        this.isLoginError = true;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage = jsonObject.message;
        this.msg = this.errorMessage;
      }
    );
  }
}
