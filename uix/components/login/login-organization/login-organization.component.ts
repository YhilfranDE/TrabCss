import { Component, OnInit, Output,EventEmitter } from "@angular/core";
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

export interface DataEmpresa {
  ruc: string,
  dni: string,
  carnet: string,
  password: string,
  recordarDatos: boolean,
  documentType: string,
}

@Component({
  selector: 'app-login-organization',
  templateUrl: './login-organization.component.html',
  styleUrls: ['./login-organization.component.css']
})
export class LoginOrganizationComponent implements OnInit {
  public loading: boolean = false;
  public isLoginError: boolean = false;
  public errorMessage: string;
  public access_token: any;

  // Objeto con atributos de formulario
  data: DataEmpresa = {
    ruc: null,
    dni: null,
    carnet: null,
    password: null,
    recordarDatos: false,
    documentType: "DNI"
  }

  public documentTypes = [];

  @Output() errorLogin:EventEmitter<boolean>;

  constructor(
    private router: Router,
    private securityService: SecurityService, /*, private encryptionService: EncryptionService*/
    private documentsService:DocumentsService
  ) {
    this.initData();
    this.errorLogin = new EventEmitter();
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

  // Loading
  //onClickMe(){
  //this.loading = true;
  // console.log(this.loading);
  //setTimeout(function(){
  //this.loading = false;
  //},3000);
  //}

  initData() {
    if (localStorage.getItem("dataEmpresa")) {
      var encriptedData = JSON.parse(localStorage.getItem("dataEmpresa"));
      //console.log("data: ", JSON.stringify(encriptedData));
      this.data = encriptedData;

      /* this.decryptText(this.passphrase, encriptedData.password).then((value) => {
         encriptedData.password = value;

         this.data = encriptedData;
         //console.log("data: ", JSON.stringify(this.data));
       });*/
    }
  }

  saveData(data) {
    localStorage.setItem("dataEmpresa", JSON.stringify(data));
  }

  clearData() {
    localStorage.removeItem("dataEmpresa");
  }


  
  getDocumentTypesByCustomerType( ){  
    this.documentsService.getDocumentTypesByCustomerType(2)
    .subscribe(result => {
      this.documentTypes = result.json();
      console.log(this.documentTypes);     
    }, err => {    
      var error = <any>err;
      var jsonObject = JSON.parse(error.text());
      let message = jsonObject.message;
      this.errorMessage = message;
    });   
  }  


  iniciarSesion( loginForm: NgForm, data: DataEmpresa) {
    this.loading = true;
    let dniOrCex;

    if (data.documentType == "DNI") {
      dniOrCex = this.data.dni;
    } else { dniOrCex = this.data.carnet; }


    this.securityService.validateEmpresa(data.ruc, dniOrCex, data.password,data.documentType).subscribe(
      (result: any) => {
      //  this.loading = false;
        this.securityService.login(dniOrCex,data.password).subscribe(
          (result: any) => {
            console.log("result: ", result);
            var jsonObject = JSON.parse(result.text());
            console.log(jsonObject);
            localStorage.removeItem("control"); //-->Variable de control que determina el tab que se debe activar al cerrar sesion
     
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
