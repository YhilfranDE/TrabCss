import { Component, OnInit,Input,Output,EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { SecurityService } from "../../../services/security/security.service";
import { isUndefined } from "util";
import { DocumentsService } from "../../../services/documents/documents.service";
//import { EncryptionService } from 'angular-encryption-service';
import {
  NgForm,
  FormControl,
  FormGroupDirective,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export interface DataPersona {
  dni: string,
  carnet       : string,
  password: string,
  recordarDatos: boolean,
  documentType : any
}

@Component({
  selector: "app-login-person",
  templateUrl: "./login-person.component.html",
  styleUrls: ["./login-person.component.css"]
})
export class LoginPersonComponent implements OnInit {
  passphrase: string = "m14m3r1c4t3l";
  isLoginError: boolean = false;
  errorMessage: string;
  public loading: boolean = false;
  public access_token: any;
  public clearCheckSession=true;

  // Objeto con atributos de formulario
  data: DataPersona = {
    dni          : null,
    carnet       : null,
    password     : null,
    recordarDatos: false,
    documentType : "DNI"
  }

  public documentTypes = [];

  @Output() errorLogin:EventEmitter<boolean>;

  constructor(
    private router: Router,
    private securityService: SecurityService, /*, private encryptionService: EncryptionService*/
    private documentsService:DocumentsService
  ) {
    this.initData();
    this.errorLogin = new EventEmitter()
    this.getDocumentTypesByCustomerType();
  }

  ngOnInit() {}

  /*encryptText(passphrase, plainText): Promise<string> {
    return this.encryptionService.generateKey(passphrase).then(key => {
      return this.encryptionService.encrypt(plainText, key);
    });
  }

  decryptText(passphrase, encrytedText): Promise<string> {
    return this.encryptionService.generateKey(passphrase).then(key => {
      return this.encryptionService.decrypt(encrytedText, key);
    });
  }*/

  initData() {
    if (localStorage.getItem("dataPersona")) {
      var encriptedData = JSON.parse(localStorage.getItem("dataPersona"));
      //console.log("data: ", JSON.stringify(encriptedData));
      this.data = encriptedData;

      /*this.decryptText(this.passphrase, encriptedData.password).then((value) => {
        encriptedData.password = value;

        this.data = encriptedData;
        //console.log("data: ", JSON.stringify(this.data));
      });*/
    }
  }

  saveData(data) {
    localStorage.setItem("dataPersona", JSON.stringify(data));
  }

  clearData() {
    localStorage.removeItem("dataPersona");
  }


  getDocumentTypesByCustomerType( ){   
    this.documentsService.getDocumentTypesByCustomerType(2)
    .subscribe(result => {
      this.documentTypes = result.json();    
    }, err => {    
      var error = <any>err;
      var jsonObject = JSON.parse(error.text());
      let message = jsonObject.message;
      this.errorMessage = message;
    });   
  }  

  iniciarSesion(loginForm: NgForm, data: DataPersona) { 
    this.loading = true;
    let dniOrCex;
    /* Condiciono numero de documento a enviar*/
    if(data.documentType == "DNI"){ 
      dniOrCex=this.data.dni;  
      }else {dniOrCex=this.data.carnet; }
    this.securityService.validatePersona(dniOrCex,data.password,data.documentType).subscribe(
      (result: any) => {
        //console.log(JSON.parse(result.text()));
        //this.loading = false;
        this.securityService.login(dniOrCex,data.password).subscribe(
          (result: any) => {
            //console.log("result: ", result);
            var jsonObject = JSON.parse(result.text());
            console.log(jsonObject);
            //localStorage.setItem("control", jsonObject.session_id);
            localStorage.setItem("control", "1"); //-->Variable de control que determina el tab que se debe activar al cerrar sesion
        
            this.errorLogin.emit(true);
            localStorage.setItem("sessionId", jsonObject.session_id);
            localStorage.setItem(
              "token",
              '{"access_token": "' +
                jsonObject.token.access_token +
                '", "token_type": "' +
                jsonObject.token.token_type +
                '", "refresh_token": "' +
                jsonObject.token.access_token +
                '", "expires_in": "' +
                jsonObject.token.expires_in +
                '", "scope": "' +
                jsonObject.token.scope +
                '"}'
            );
            localStorage.setItem("userId", dniOrCex);
            //console.log("recordarDatos = ", loginForm.value.recordarDatos);
            if (loginForm.value.recordarDatos) {
              this.saveData(this.data);
            } else {
              this.clearData();
            }

            this.router.navigate(["/Principal/EvolucionFacturacion"]);
           this.loading = false;
          },
          err => {
            this.errorLogin.emit(true);
            //console.log(err);
            this.isLoginError = true;
           this.loading = false;
            var error = <any>err;
            var jsonObject = JSON.parse(error.text());
            //console.log(jsonObject);
            if (isUndefined(jsonObject.message)) {
              if ((jsonObject.error_description = "Bad credentials")) {
               this.loading = false;
                this.errorLogin.emit(true);
                this.errorMessage = "Credenciales incorrectas";
              } else {
               this.loading = false;
                this.errorLogin.emit(true);
                this.errorMessage = jsonObject.error_description;
              }
            } else {
              if ((jsonObject.message = "Too Many Requests")) {
               this.loading = false;
                this.errorLogin.emit(true);
                this.errorMessage = "El usuario ya tiene una sesion activa";
              } else {
                this.loading = false;
                this.errorLogin.emit(true);
                this.errorMessage = jsonObject.message;
              }
            }
          }
        );
      },
      err => {
        this.errorLogin.emit(true);
        //console.log(err);
        this.isLoginError = true;
       this.loading = false;
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        //console.log(jsonObject);
        this.errorMessage = jsonObject.message;
      }
    );
  }
}
