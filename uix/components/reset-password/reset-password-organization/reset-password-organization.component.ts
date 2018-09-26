import { Component, OnInit } from "@angular/core";
import { NgForm, FormControl, FormGroupDirective } from "@angular/forms";
import { RecoverPasswordService } from "../../../services/security/recover-password.service";
import { ErrorStateMatcher } from "@angular/material/core";
import { DocumentsService } from "../../../services/documents/documents.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-reset-password-organization",
  templateUrl: "./reset-password-organization.component.html",
  styleUrls: ["./reset-password-organization.component.css"]
})
export class ResetPasswordOrganizationComponent implements OnInit {
  public isError: boolean = false;
  public errorMessage: string;
  public loading: boolean = false;

  // Objeto con atributos de formulario - Recuperar Empresa
  dataEmpresa = {
    dni: null,
    carnet: null,
    correoEmpresa: null,
    documentType: "DNI"
  };

  public documentTypes = [];

  mensajeExito: boolean = false;

  constructor(private recoverPasswordService: RecoverPasswordService,
      private documentsService:DocumentsService ) {

    this.getDocumentTypesByCustomerType();
  }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {this.loading = false;}, 1000);
  }


  getDocumentTypesByCustomerType( ){
    this.loading = true;  
    this.documentsService.getDocumentTypesByCustomerType(2)
    .subscribe(result => {
      this.documentTypes = result.json();
      console.log(this.documentTypes);
      this.loading = false;
    }, err => {
      this.loading = false;     
      var error = <any>err;
      var jsonObject = JSON.parse(error.text());
      let message = jsonObject.message;
      this.errorMessage = message;
    });   
  }  
 
  recoverCompany(dni, email) {
    this.loading = true;   
    this.recoverPasswordService.recuperarEmpresa(
      this.dataEmpresa["dni"],
      this.dataEmpresa["correoEmpresa"],
      this.dataEmpresa['documentType']
    )
    .subscribe(result => {
        console.log(result);
        this.mensajeExito = true;
        this.isError = false;
        this.loading = false;
      },
      err => {
        this.isError = true;
        this.loading = false;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        console.log(jsonObject);
        this.errorMessage = jsonObject.message;
      }
    );
  }
}
