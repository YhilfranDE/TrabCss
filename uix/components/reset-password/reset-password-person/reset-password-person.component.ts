import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RecoverPasswordService } from "../../../services/security/recover-password.service";
import { DocumentsService } from "../../../services/documents/documents.service";

@Component({
  selector: "app-reset-password-person",
  templateUrl: "./reset-password-person.component.html",
  styleUrls: ["./reset-password-person.component.css"]
})
export class ResetPasswordPersonComponent implements OnInit {
  public isError         : boolean = false;
  public errorMessage    : string;
  public loading         : boolean = false;
  mensajeExito : boolean = false;

  // Objeto con atributos de formulario - Recuperar Persona
  dataPersona = {
    dni: null,
    carnet: null,
    correoPersona: null,
    documentType: "DNI"
  };

  public documentTypes = [];

  constructor(private recoverPasswordService: RecoverPasswordService,private documentsService:DocumentsService) {

    this.getDocumentTypesByCustomerType();
  }

  ngOnInit() {
    this.loading = true;
    setTimeout(()=>{this.loading = false;}, 1000);
  }

  /*recuperarPersona(personaForm: NgForm) {
    console.log("ngForm", personaForm.value);
    console.log("ObjetoPersona", this.dataPersona);
    this.loading = true;
    this.recoverPasswordService
      .recuperarPersona(this.dataPersona['dni'],
      this.dataPersona['correoPersona'],
      this.dataPersona['documentType'])
      .subscribe((result: any) => {
        console.log(result);
        this.mensajeExito=true;
        this.isError=false;
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
  }*/


  
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
  recoverPerson(dni, email) {
    this.loading = true;
    console.log(dni,email);
    this.recoverPasswordService.recuperarPersona(
      this.dataPersona['dni'],
      this.dataPersona['correoPersona'],
       this.dataPersona['documentType'])
     .subscribe(result => {
        console.log(result);
        this.mensajeExito=true;
        this.isError=false;
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
