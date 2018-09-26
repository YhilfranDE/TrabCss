import { Component, OnInit } from "@angular/core";
import { ClientsService } from "../../../services/clients/clients.service";
import { NgForm, FormControl, FormGroupDirective, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { registrarEmpresa } from "../../../interface/registrarUsuario.interface";
import { RecoverPasswordService } from "../../../services/security/recover-password.service";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { MatStepper } from '@angular/material';
import { DocumentsService } from "../../../services/documents/documents.service";

@Component({
  selector: "app-register-user-organization",
  templateUrl: "./register-user-organization.component.html",
  styleUrls: ["./register-user-organization.component.css"]
})
export class RegisterUserOrganizationComponent implements OnInit {

  public errormsg: string;
  public loading: boolean = false;
  public isError: boolean = false;
  public errorMessage: string;
  public isLinear: boolean = true;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public disable: boolean = true;
  public isOptional = true;
  public isEditable = false;
  public errorDoc = '';
  public formControlName = '';
  public placeholderDocument = 'Documento Nacional de Identidad';
  public patterDocument = '';
  public formControlDocument = '';
  public maxlengthDocument = null;
  public minlengthDocument = null;
  public textDocument = '';
  public stepOneControl;
  public stepTwoControl;
  public typeData;

  // Data para registro de empresa
  data: registrarEmpresa = {
    customerDocumentNumber:'',
    representativeDocumentNumber: '',
    representativeEmail: '',
    carnet: '',
    documentType: "DNI"
  }

  public documentTypes = [ ];
  constructor(
    private clientsService: ClientsService,
    private recoverPasswordService: RecoverPasswordService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private documentsService:DocumentsService 
  ) { this.getDocumentTypesByCustomerType();}

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    this.firstFormGroup = this._formBuilder.group({
      customerDocumentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength,
          Validators.maxLength,
          Validators.pattern
        ]
      ],
      stepOneControl: [
        '',
        [
          Validators.required,

        ]
      ]
    });

    this.secondFormGroup = this._formBuilder.group({
      documentType: [
        'DNI',
        [
          Validators.required,
        ]
      ],
      representativeDocumentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength,
          Validators.maxLength,
          Validators.pattern
        ]
      ],
      representativeEmail: [
        '',
        [
          Validators.required,
          Validators.maxLength,
          Validators.pattern
        ]
      ],
      stepTwoControl: [
        '',
        [
          Validators.required,

        ]
      ]
    });
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


  changeTypeDoc(event) {
    if (event == 'DNI') {
      this.placeholderDocument = 'Documento Nacional de Identidad';
      this.minlengthDocument = 8;
      this.maxlengthDocument = 8;
      this.patterDocument = "[0-9]{1,8}";
      this.textDocument = "DNI";
      this.typeData = "Númerico";
    }

    else if (event == 'CE') {
      this.placeholderDocument = 'Carnet de Extranjeria';
      this.minlengthDocument = 12;
      this.maxlengthDocument = 12;
      this.patterDocument = "[a-zA-Z0-9]+";
      this.textDocument = "Carnet de Extranjeria";
      this.typeData = "Alfanumerico";
    }    
    this.secondFormGroup.get('representativeDocumentNumber').setValue("");
  }


  checkRecaptcha() {    
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
      return false;
    }

    return true;
  }

  goSecondStep(stepper: MatStepper, costumerDocument) {
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
      this.errormsg = '¡Recaptcha no verificado!';
      this.stepOneControl = "";
      return;
    }  else {
      this.stepOneControl = "off";
      this.errormsg = "";
      this.validateCustomerDocument(stepper, costumerDocument);
    }
  }  


  goThirdStep(stepper: MatStepper) {

    console.log(this.data);
    this.loading = true;

    this.clientsService
      .etapaDosEmpresa(
        this.data["customerDocumentNumber"],
        this.data["representativeDocumentNumber"],
        this.data["representativeEmail"],
        this.data["documentType"]
      )
      .subscribe(
        result => {
          this.stepTwoControl = "off";
          this.registerUser(stepper);
        },
        err => {
          var error = <any>err;
          var jsonObject = JSON.parse(error.text());
          this.errorMessage = jsonObject.message;
          this.loading = false;
          this.isError = true;
          this.stepTwoControl = "";
        }
      );
  }

  registerUser(stepper: MatStepper) {
    this.clientsService
      .etapaTresEmpresa(
        this.data["customerDocumentNumber"],
        this.data["representativeDocumentNumber"],
        this.data["representativeEmail"],
        this.data["documentType"]
      )
      .subscribe(
        resul => {
          this.stepTwoControl = "off";
          this.isError = false;
          this.loading = false;
          stepper.next();
        },
        err => {
          var error = <any>err;
          var jsonObject = JSON.parse(error.text());
          this.errorMessage = jsonObject.message;
          this.loading = false;
          this.isError = true;
          this.stepTwoControl = "";
        }
      );
  }

  validateCustomerDocument(stepper: MatStepper, costomerDocument) {
    this.loading = true;
    console.log(costomerDocument);
    this.clientsService.etapaUnoEmpresa(costomerDocument).subscribe(
      result => {
        this.isError = false;
        this.loading = false;
        stepper.next();
      },
      err => {
        this.stepOneControl = "";
        var error = <any>err;
        var jsonObject = JSON.parse(error.text());
        this.errorMessage = jsonObject.message;
        this.loading = false;
        this.isError = true;
      }
    );
  }

  onClick() {
    this.router.navigate(["/Login"]);
  }

  //Reenvio de contraseña
  recuperarEmpresa() {
    this.loading = true;
    this.recoverPasswordService
      .recuperarEmpresa(
        this.data["representativeDocumentNumber"],
        this.data["representativeEmail"],
        this.data["documentType"]
      )
      .subscribe(
        (result: any) => {
          this.isError = false;
          this.loading = false;
        },
        err => {
          var error = <any>err;
          var jsonObject = JSON.parse(error.text());
          this.errorMessage = jsonObject.message;
          this.loading = false;
          this.isError = true;
        }
      );
  }


}
