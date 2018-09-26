import { Component, OnInit } from "@angular/core";
import { ClientsService } from "../../services/clients/clients.service";
import { forEach } from "@angular/router/src/utils/collection";
import { isJsObject } from "@angular/core/src/change_detection/change_detection_util";

@Component({
  selector: "app-my-information",
  templateUrl: "./my-information.component.html",
  styleUrls: ["./my-information.component.css"]
})
export class MyInformationComponent implements OnInit {
  data = {
    userName: null,
    customerDocumentNumberid: null, // valor RUC o DNI
    customerName: null, // Razon Social o Titular
    userDocumentNumber: null,
    userDocumentType: null,
    userEmail: null,
    numeuserPhonero: null,
    customerDocumentType: null
  };

  datos: any;
  empresa: Boolean = true;
  persona: Boolean = true;
  loading: boolean;
  isLoginError: boolean = false;
  errorMessage: string;
  msg: string;
  loadCompletedHere:boolean;

  constructor(private clientsService: ClientsService) {
    this.datos = {
      customerType: "",
      customerDocumentType: "",
      customerDocumentNumber: "",
      customerName: "",
      contactDocumentType: "",
      contactDocumentNumber: "",
      contactName: "",
      contactEmail: "",
      contactPhone: ""
    };
    this.loading = false;
  }

  ngOnInit() {
    this.cargarDatos();
    //this.datos = this.asignarData();
  }

  cargarDatos() {
    this.loading = true;
    var userId = localStorage.getItem("userId");
    this.clientsService.misDatos(userId).subscribe(
      result => {
        this.datos = this.asignarData(result.json());
        this.loading = false;
        this.loadCompletedHere = true;
      },
      err => {
        this.loading = false;
        this.isLoginError = true;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage = jsonObject.message;
        this.msg = this.errorMessage;
      }
    );
  }

  asignarData(value) {
    return {
      customerType: value.customerType,
      customerDocumentType: value.customerDocumentType,
      customerDocumentNumber: value.customerDocumentNumber,
      customerName: value.customerName,
      contactDocumentType: value.contactDocumentType,
      contactDocumentNumber: value.contactDocumentNumber,
      contactName: value.contactName,
      contactEmail: value.contactEmail,
      contactPhone: value.contactPhone
    };
  }
}
